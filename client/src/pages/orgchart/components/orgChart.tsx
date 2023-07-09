// if you struggle to understand something just check the d3-org-chart repo in github

import { useRef, useLayoutEffect, useState, FC, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import ExpandButton from "./ExpandButton";
import Card from "./Card";
import { Node } from "../types";
import * as d3 from "d3";
import { getNodeByEmail, getTeammatesNodes } from "../utils";
import { useStore } from "../../../state/store";
import InvitationForm from "./InvitationForm";


type OrganizationalChartProps = {
  data: Node[] | any;
}
const chart = new OrgChart();


const OrganizationalChart: FC<OrganizationalChartProps> = ({ data }) => {

  const user = useStore((state: any) => state.user)
  const setTeammate = useStore((state: any) => state.setTeammate)

  const [showForm, setShowForm] = useState(false);
  //const [parentNodeId, setParentNodeId] = useState<string | number>("");
  // const [supervisor, setSupervisor] = useState("");

  /*  const handleNodeClick = (node: Node) => {
    setParentNodeId(node.id);
    setSupervisor(node.name)
    setShowForm(true);
    };*/

  const handleInvite = (node: Node) => {
    setTeammate(node);
    setShowForm(true);
  };
  /*const handleFullScreen = () => {
    chart.fullscreen();
    chart.setCentered(myNode.id);
    chart.render()
  };*/

  const email = user?.email
  const myNode = getNodeByEmail(data, email)

  useEffect(() => {
    let teammates = []
    if (user.isSupervisor) {
      teammates = data?.filter((d: any) => d.parentId == myNode.id)
    }
    else {
      //  const supervisorNode = data?.filter((d: any) => d.id == myNode?.parentId)
      teammates = getTeammatesNodes(data, myNode?.parentId)
      teammates = teammates.filter((teammate: any) => teammate?.name !== user?.name)
      // teammates = [...teammates, supervisorNode[0]]
    }
    localStorage.setItem('teammates', JSON.stringify(teammates))
  }, [])

  const d3Container = useRef<any>(null);
  useLayoutEffect(() => {

    let compact = 0;
    if (data && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth((d: any) => d.data.position ? 830 : 620)
        .nodeHeight((d: any) => d.data.position ? 620 : d.data.name.toLowerCase().includes('team') ? 300 : 420)
        .childrenMargin((d: any) => 100)
        .siblingsMargin((d: any) => 80)
        .neightbourMargin((d: any) => 20)
        .nodeUpdate(function (this: HTMLElement, d, i, arr) {
          d3.select(this)
            .attr('stroke', (d: any) =>
              d.data._highlighted
                ? 'black'
                : 'none'
            ).attr("stroke-width", 15)
          const currentNode = d3.select(this)
          const inviteButton = currentNode.select('#inviteBtn');
          inviteButton.on('click', () => {
            handleInvite(d.data as Node)
          })
        })
        .linkUpdate(function (this: HTMLElement, d, i, arr) {
          d3.select(this)
            .attr("stroke", "black")
            .attr("stroke-width", 6.5)
        })
        .compact(!!(compact++ % 2)).render().fit()
        .onNodeClick((d) => {
          //const node = getNodeById(data, d)
          //console.log(node)
          /* if (node?.email)
             handleNodeClick(node)*/
        })
        .buttonContent((node) => {
          return renderToStaticMarkup(
            <ExpandButton  {...node.node} />
          );
        })
        .nodeContent((d) => {
          return renderToStaticMarkup(
            <Card {...d} />
          );
        }).svgHeight(800).render()
        .setCentered(myNode?.id).setHighlighted(myNode?.id).initialZoom(0.33).render();
      if (user.role === "ADMIN") {
        chart.expandAll().render().fit()
      }
      //.setCentered(9).initialZoom(0.3).render();
      // d3.select('svg').attr("transform", "translate(0, 0)");   
    }
  }, [data]);

  return (
    <>
      <div className="org-chart" ref={d3Container}>

      </div>
      {<InvitationForm
        showForm={showForm}
        setShowForm={setShowForm} />
      }        {/* <AddEmployee
        parentNodeId={parentNodeId}
        showForm={showForm}
        setShowForm={setShowForm}
        chart={chart}
        Supervisor={supervisor}
        setSupervisor={setSupervisor}
        />*/}
    </>

  );
};

export default OrganizationalChart;

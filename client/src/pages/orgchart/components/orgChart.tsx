import { useRef, useLayoutEffect, useState, FC, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import CustomExpandButton from "./customExpandButton";
import Card from "./Card";
import { Node } from "../types";
import * as d3 from "d3";
import { Button, Theme, useTheme } from "@mui/material";
import { getNodeByEmail, getNodeById, getTeammatesNodes } from "../utils";
import { useStore } from "../../../state/store";
import InvitationForm from "./InvitationForm";


type OrganizationalChartProps = {
  data: Node[] | undefined;
}
const chart = new OrgChart();

const OrganizationalChart: FC<OrganizationalChartProps> = ({ data }) => {

  const theme = useTheme<Theme>();

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

  const handleFullScreen = () => {
    chart.fullscreen();
    chart.setCentered(myNode.id);
    chart.render()
  };

  const email = user?.email
  const myNode = getNodeByEmail(data, email)

  useEffect(() => {
    let teammates = getTeammatesNodes(data, myNode.parentId)
    teammates = teammates.filter((teammate: any) => teammate.name !== user.name)
    localStorage.setItem('teammates', JSON.stringify(teammates))
  }, [])

  const d3Container = useRef<any>(null);


  useLayoutEffect(() => {
    let compact = 0;
    if (data && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth((d: any) => d.data.position ? 830 : 630)
        .nodeHeight((d: any) => d.data.position ? 620 : 420)
        .childrenMargin((d: any) => 100)
        .siblingsMargin((d: any) => 80)
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
            //   console.log(d.data)
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
            <CustomExpandButton  {...node.node} />
          );
        })
        .nodeContent((d) => {
          return renderToStaticMarkup(
            <Card {...d} />
          );
        }).svgHeight(800).render()
        .setCentered(myNode.id).setHighlighted(myNode.id).initialZoom(0.33).render();
      //.setCentered(9).initialZoom(0.3).render();
      // d3.select('svg').attr("transform", "translate(0, 0)");   
    }
  }, [data]);

  return (
    <>
      <div className="org-chart" ref={d3Container}>
        <Button variant='contained'
          onClick={handleFullScreen}
          sx={{
            marginX: '20px',
            marginY: '20px',
            position: 'absolute',
            padding: '8px 10px',
            borderRadius: '8px',
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
            },
          }}>Fullscreen</Button>
      </div>
      {<InvitationForm
        showForm={showForm}
        setShowForm={setShowForm} />
      }      {/* <AddEmployee
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

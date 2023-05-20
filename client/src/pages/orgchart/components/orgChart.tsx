import { useRef, useLayoutEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import CustomExpandButton from "./customExpandButton";
import Card from "./Card";
import { Node } from "../types";
import * as d3 from "d3";
import { Button, Theme, useTheme } from "@mui/material";
import useAuthStore from "../../../store";
import { getNodeID, getNodeInfo } from "../utils";
import AddEmployee from "./AddEmployeeForm";
const chart = new OrgChart();

type OrganizationalChartProps = {
  data: Node[] | undefined;
}

const OrganizationalChart = ({ data }: OrganizationalChartProps) => {

  const [showForm, setShowForm] = useState(false);
  const [parentNodeId, setParentNodeId] = useState("");
  const [supervisor, setSupervisor] = useState("");


  const handleNodeClick = (node: any) => {
    setParentNodeId(node.id);
    setSupervisor(node.name)
    setShowForm(true);
  };

  const store = useAuthStore()

  const email = store.user?.email

  const NodeId = getNodeID(data, email)

  const d3Container = useRef<any>(null);


  const handleFullScreen = () => {

    //   chart.addNode()
    // chart.fullscreen();
    // chart.setCentered(13);
    // chart.render()
  };

  useLayoutEffect(() => {
    let compact = 0;
    if (data && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth((d: any) => d.data.role ? 830 : 630)
        .nodeHeight((d: any) => d.data.role ? 620 : 420)
        .childrenMargin((d: any) => 100)
        .siblingsMargin((d: any) => 80)
        .nodeUpdate(function (this: HTMLElement, d, i, arr) {
          d3.select(this)
            .attr('stroke', (d: any) =>
              d.data._highlighted
                ? 'black'
                : 'none'
            ).attr("stroke-width", 15)

        })
        .linkUpdate(function (this: HTMLElement, d, i, arr) {
          d3.select(this)
            .attr("stroke", "black")
            .attr("stroke-width", 6.5)
        })
        .compact(!!(compact++ % 2)).render().fit()
        .onNodeClick((d) => {
          const node = getNodeInfo(data, d)
          handleNodeClick(node)

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
        //.setCentered(9).initialZoom(0.3).render();
        .setCentered(NodeId).setHighlighted(NodeId).initialZoom(0.33).render();
      // d3.select('svg').attr("transform", "translate(0, 0)");   

    }
  }, [data]);

  const theme = useTheme<Theme>();
  return (
    <>
      <div className="org-chart" ref={d3Container}>
        <Button variant='contained'
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
      <AddEmployee
        parentNodeId={parentNodeId}
        showForm={showForm}
        setShowForm={setShowForm}
        chart={chart}
      //   Supervisor={supervisor}
      />
    </>

  );
};

export default OrganizationalChart;

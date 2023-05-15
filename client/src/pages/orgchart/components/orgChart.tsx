import { useRef, useLayoutEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import CustomExpandButton from "./customExpandButton";
import Card from "./Card";
import { Node } from "../types";
import * as d3 from "d3";
import { Button, Theme, useTheme } from "@mui/material";

interface OrganizationalChartProps {
  data: Node[] | undefined;
}

const OrganizationalChart = ({ data }: OrganizationalChartProps) => {

  const d3Container = useRef<any>(null);
  const chart = new OrgChart();

  const handleFullScreen = () => {
    chart.fullscreen();
    chart.setCentered(13);
    chart.render()
  };
  useLayoutEffect(() => {
    let compact = 0;
    if (data && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth((d: any) => d.data.role ? 830 : 630)
        .nodeHeight((d: any) => d.data.role ? 620 : 420)
        .childrenMargin((d: any) => 130)
        .siblingsMargin((d: any) => 80)
        .linkUpdate(function (this: HTMLElement, d, i, arr) {
          d3.select(this)
            .attr("stroke", "black")
            .attr("stroke-width", 6.5)
        })
        .compact(!!(compact++ % 2)).render().fit()
        /*.onNodeClick((d)=>chart.setHighlighted(d).render())*/
        .buttonContent((node) => {
          return renderToStaticMarkup(
            <CustomExpandButton  {...node.node} />
          );
        })
        .nodeContent((d) => {
          return renderToStaticMarkup(
            <Card {...d} />
          );
        }).svgHeight(850).render()
        //.setCentered(9).initialZoom(0.3).render();
        .setCentered("1-1-1-1-2-6").setHighlighted("1-1-1-1-2-6").initialZoom(0.33).render();
      // d3.select('svg').attr("transform", "translate(0, 0)");   

    }
  }, [data]);
  const theme = useTheme<Theme>();
  return (
    <div>
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

    </div>

  );
};

export default OrganizationalChart;

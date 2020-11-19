import React, { useState, useEffect, useContext } from "react";
import * as d3 from "d3";
import api from "../services/api";
import { useD3 } from "./useD3";

function Scatterplot() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.getProjects();
      setData(response);
    }
    fetchData();
  }, []);

  //function do be able to do d3.select(svg)
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 720;
      const margin = { top: 20, right: 30, bottom: 30, left: 50 };

      //scale for x var represents amount fundraised

      const xScale = d3
        .scaleSqrt()
        .range([margin.left, width - margin.right])
        .domain([
          d3.min(data, (d) => d.funding),
          d3.max(data, (d) => d.funding),
        ]);

      //scale fory var represents initial goal
      const yScale = d3
        .scaleSqrt()
        .range([height - margin.bottom, margin.top])
        .domain([d3.min(data, (d) => d.goal), d3.max(data, (d) => d.goal)]);

      //color represents the themeId
      const color = d3.scaleOrdinal().range(d3.schemeTableau10);

      //the real axis

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(xScale)
            .tickValues(d3.ticks(...d3.extent(xScale.domain()), width / 100))
            .tickSizeOuter(0)
        );

      const yAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(yScale).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.yScale)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(yAxis);

      var tooltip = d3.select(".tooltip-area").style("opacity", 0);

      const mouseover = (event, d) => {
        tooltip.style("opacity", 1);
      };

      const mouseleave = (event, d) => {
        tooltip.style("opacity", 0);
      };

      const mousemove = (event, d) => {
        const text = d3.select(".tooltip-area__text");
        text.text(`Theme: ${d.ThemeId}`);
        const [x, y] = d3.pointer(event);

        tooltip.attr("transform", `translate(${x}, ${y})`);
      };

      svg
        .selectAll(".circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("cx", (d) => xScale(d.funding))
        .attr("cy", (d) => yScale(d.goal))
        .attr("fill", (d) => color(d.ThemeId))
        .attr("fill-opacity", 0.4)
        .attr("stroke", (d) => color(d.ThemeId))
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)
        .on("mousemove", mousemove);
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
      className="bg-white"
    >
      <g className="x-axis" />

      <g className="y-axis" />
      <g className="tooltip-area">
        <text className="tooltip-area__text">aas</text>
      </g>
    </svg>
  );
}
export default Scatterplot;

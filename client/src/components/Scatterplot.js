import React, { Component, useState, useEffect } from "react";
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

  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 720;
      const margin = { top: 20, right: 30, bottom: 30, left: 50 };

      //scale for x var represents amount fundraised

      const x = d3
        .scaleLinear()
        .range([margin.left, width - margin.right])
        .domain([1, d3.max(data, (d) => d.funding)]); //.domain([200, 150000]);
      //scale fory var represents initial goal
      const y = d3
        .scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain([1, d3.max(data, (d) => d.goal)]); //.domain([0, 90]) - life expectancy max

      //color represents the country
      const color = d3.scaleOrdinal().range(d3.schemeTableau10);

      //the real axis

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x) // .call(d3.axisBottom(x).ticks(width / 80, ","));
            .tickValues(
              d3.ticks(...d3.extent(x.domain()), width / 80)
              //.filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0) //?
        );

      const yAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y).ticks(null, "s")) //.call(d3.axisLeft(y));
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(yAxis);

      svg
        //.select(".plot-area")
        //.attr("fill", "steelblue")
        .selectAll(".circle")
        /*.data(
          data.filter((d) => d.goal && d.funding),
          (d) => d.id
        )*/
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("cx", (d) => x(d.funding))
        .attr("cy", (d) => y(d.goal))
        .attr("fill", (d) => color(d.ThemeId))
        .attr("fill-opacity", 0.4)
        .attr("stroke", (d) => color(d.ThemeId));
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
    </svg>
  );
}
export default Scatterplot;

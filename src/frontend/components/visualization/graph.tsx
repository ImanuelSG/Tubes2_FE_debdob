"use client";
import React, { useEffect, useRef, RefObject } from "react";
import * as d3 from "d3";
import type { CustomNode, Edge } from "../../lib/types";

interface DirectedGraphProps {
  nodes: CustomNode[];
  links: Edge[];
  levelNum: number[];
}

const getColorByLevel = (level: number): string => {
  switch (level) {
    case 0:
      return "#1f77b4"; // Blue
    case 1:
      return "#ff7f0e"; // Orange
    case 2:
      return "#2ca02c"; // Green
    case 3:
      return "#d62728"; // Red
    case 4:
      return "#9467bd"; // Purple
    case 5:
      return "#8c564b"; // Brown
    case 6:
      return "#e377c2"; // Pink
    case 7:
      return "#7f7f7f"; // Gray
    case 8:
      return "#bcbd22"; // Yellow
    case 9:
      return "#17becf"; // Cyan
    default:
      return "#00ff00"; // Green
  }
};

const DirectedGraph: React.FC<DirectedGraphProps> = ({
  nodes,
  links,
  levelNum,
}) => {
  const svgRef: RefObject<SVGSVGElement> = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 1000; // Horizontal width
    const height = 1000; // Vertical height

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const levelSeparation = 50; // Vertical space between levels
    const nodeSpacing = 150; // Horizontal space between nodes

    // Center the root node
    const centerX = width / 2; // Horizontal center
    const centerY = 20; // Vertical center

    // Position nodes based on level and index
    const positionNodes = (nodes: CustomNode[]): void => {
      const levelCounts: Record<number, number> = {}; // Track nodes per level

      nodes.forEach((node) => {
        const level = node.level ?? 0;
        levelCounts[level] = (levelCounts[level] || 0) + 1;
        // Vertical position by level, centered around the middle
        node.y = centerY + level * levelSeparation; // Centered vertically
        // Horizontal position with adequate spacing
        const nodesInLevel = levelNum[level];
        const totalSpacing = (nodesInLevel - 1) * nodeSpacing; // Total horizontal spacing
        const startingX = width / nodesInLevel - totalSpacing / 2; // Start from the left
        node.x = centerX - totalSpacing / 2 + (nodesInLevel - 1) * nodeSpacing; // Centered horizontally
      });
    };

    positionNodes(nodes);

    // Render the links with updated coordinates
    svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("x1", (d: Edge) => {
        const sourceNode = nodes.find((n) => n.id === d.source);
        return sourceNode?.x ?? 0;
      })
      .attr("y1", (d: Edge) => {
        const sourceNode = nodes.find((n) => n.id === d.source);
        return sourceNode?.y ?? 0;
      })
      .attr("x2", (d: Edge) => {
        const targetNode = nodes.find((n) => n.id === d.target);
        return targetNode?.x ?? 0;
      })
      .attr("y2", (d: Edge) => {
        const targetNode = nodes.find((n) => n.id === d.target);
        return targetNode?.y ?? 0;
      })
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    // Render the nodes as circles with text
    svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", (d: CustomNode) => d.x ?? 0)
      .attr("cy", (d: CustomNode) => d.y ?? 0)
      .attr("r", 20) // Radius of the circle
      .attr("fill", (d: CustomNode) => getColorByLevel(d.level ?? 0)) // Fill color based on level
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        window.open(d.link, "_blank");
      });

    // Add text on top of the circles
    svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", (d: CustomNode) => d.x ?? 0)
      .attr("y", (d: CustomNode) => (d.y ?? 0) + 5)
      .attr("text-anchor", "middle")
      .text((d: CustomNode) => d.label)
      .attr("fill", "#000000") // Text color
      .style("font-size", "12px")
      .style("pointer-events", "none"); // Ensure text doesn't interfere with click events on circles

    return () => {
      svg.selectAll("*").remove(); // Cleanup
    };
  }, [nodes, links, levelNum]);

  return <svg ref={svgRef} style={{ width: "1000px", height: "1000px" }} />;
};

export default DirectedGraph;

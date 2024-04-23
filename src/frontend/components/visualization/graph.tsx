import React, { useEffect, useRef, RefObject } from "react";
import * as d3 from "d3";
import type { CustomNode, Edge } from "../../lib/types";

interface DirectedGraphProps {
  nodes: CustomNode[];
  links: Edge[];
  levelNum: Record<number, number>;
}

const startColor = "#006C3B"; // Dartmouth-green
const endColor = "#DCA629"; // Goldenrod

const getGradientColorByLevel = (
  level: number,
  totalLevels: number
): string => {
  const interpolate = d3.interpolateRgb(startColor, endColor);
  const ratio = level / (totalLevels - 1);
  return interpolate(ratio);
};

const addLegend = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  totalLevels: number
) => {
  const legendGroup = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", "translate(20, 20)"); // Adjust the position

  // Add a label "Legend" at the top
  legendGroup
    .append("text")
    .text("Legend")
    .attr("x", 0)
    .attr("y", 0)
    .attr("font-size", "12px")
    .attr("class", "font-mono")
    .attr("fill", "#FFFFFF"); // White text for better visibility

  // Create a vertical legend for each level
  for (let i = 0; i < totalLevels; i++) {
    const color = getGradientColorByLevel(i, totalLevels);

    // Add a circle for the color representation
    legendGroup
      .append("circle")
      .attr("cx", 10 + i * 30) // Position the circle
      .attr("cy", 20) // Vertical alignment, with 20px spacing between items
      .attr("r", 10) // Radius of the circle
      .attr("fill", color);

    // Add the text next to the circle
    legendGroup
      .append("text")
      .attr("x", 7 + i * 30) // Position the text to the right of the circle
      .attr("y", 23) // Same alignment as circle
      .attr("font-size", "10px")
      .attr("class", "font-mono")
      .attr("fill", "#FFFFFF") // White text for visibility
      .text(`${i + 1}`); // Display the level number
  }
};

function sanitizeString(str: string) {
  // Removes all occurrences of ' and `
  return str.replace(/['`]/g, ""); // This will replace both ' and `
}

const DirectedGraph: React.FC<DirectedGraphProps> = ({
  nodes,
  links,
  levelNum,
}) => {
  const svgRef: RefObject<SVGSVGElement> = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 1000; // Horizontal width
    const height = Object.keys(levelNum).length * 100 + 50; // Vertical height

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#080402");

    const totalLevels = Object.keys(levelNum).length;

    // Add the legend to the top-left corner

    const defs = svg.append("defs");
    links.forEach((link) => {
      const sourceNode = nodes.find((n) => n.id === link.source);
      const targetNode = nodes.find((n) => n.id === link.target);

      if (sourceNode && targetNode) {
        const gradientId = `gradient-${sanitizeString(link.source)}-${sanitizeString(link.target)}`;

        const sourceColor = getGradientColorByLevel(
          sourceNode.level ?? 0,
          Object.keys(levelNum).length
        ); // Or use logic based on source node
        const targetColor = getGradientColorByLevel(
          targetNode.level ?? 0,
          Object.keys(levelNum).length
        ); // Or use logic based on target node

        const edgeGradient = defs
          .append("linearGradient")
          .attr("id", gradientId)
          .attr("x1", "0%")
          .attr("x2", "0%")
          .attr("y1", "0%")
          .attr("y2", "100%");

        edgeGradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", sourceColor);

        edgeGradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", targetColor);

        const markerId = `marker-${sanitizeString(link.source)}-${sanitizeString(link.target)}`;

        defs
          .append("marker")
          .attr("id", markerId) // Unique identifier for the marker
          .attr("viewBox", "0 -5 10 10") // View box for the marker
          .attr("refX", 5) // Reference point for where the line will end
          .attr("refY", 0) // Center the arrow on the line
          .attr("markerWidth", 4) // Width of the marker
          .attr("markerHeight", 4)
          .attr("orient", "auto") // Ensures the arrow points in the correct direction
          .append("path") // Define the shape of the arrowhead
          .attr("d", "M0,-5L10,0L0,5") // Path for the arrowhead
          .attr("fill", targetColor); // Color of the arrowhead
      }
    });

    const positionNodes = (nodes: CustomNode[]) => {
      const levelSeparation = 100;
      const centerY = 75;

      const levelCounts: Record<number, number> = {};
      nodes.forEach((node) => {
        const level = node.level ?? 0;
        levelCounts[level] = (levelCounts[level] || 0) + 1;
        node.y = centerY + level * levelSeparation;

        const nodesInLevel = levelNum[level];
        const StartingX = width / (nodesInLevel + 1);

        node.x = levelCounts[level] * StartingX;
      });
    };

    positionNodes(nodes);

    const calculateOffset = (source: CustomNode, target: CustomNode) => {
      if (!source.x || !source.y || !target.x || !target.y)
        return { x: 0, y: 0 };

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const ratio = 12 / distance;

      return {
        x: target.x - dx * ratio,
        y: target.y - dy * ratio,
      };
    };

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
        const sourceNode = nodes.find((n) => n.id === d.source);
        const targetNode = nodes.find((n) => n.id === d.target);
        if (sourceNode && targetNode) {
          const offset = calculateOffset(sourceNode, targetNode);
          return offset.x + 0.1;
        }
        return 0;
      })
      .attr("y2", (d: Edge) => {
        const sourceNode = nodes.find((n) => n.id === d.source);
        const targetNode = nodes.find((n) => n.id === d.target);
        if (sourceNode && targetNode) {
          const offset = calculateOffset(sourceNode, targetNode);
          return offset.y;
        }
        return 0;
      })
      .attr(
        "stroke",
        (d: Edge) =>
          `url(#gradient-${sanitizeString(d.source)}-${sanitizeString(d.target)})`
      ) // Use unique gradient
      .attr("stroke-width", 2)
      .attr(
        "marker-end",
        (d: Edge) =>
          `url(#marker-${sanitizeString(d.source)}-${sanitizeString(d.target)})`
      ); // Marker with target node color

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
      .attr("r", 12) // Radius of the circle
      .attr("fill", (d: CustomNode) =>
        getGradientColorByLevel(d.level ?? 0, Object.keys(levelNum).length)
      ) // Fill color based on level
      .style("cursor", "pointer")
      .on("click", (event, d: CustomNode) => {
        window.open(d.link, "_blank");
      })
      .on("mouseover", function (event, d) {
        // Increase the node size on hover and change the stroke color

        d3.select(this)
          .transition()
          .attr("r", 25)
          .attr("stroke", "#000")
          .attr("stroke-width", 3);
      })
      .on("mouseout", function (event, d) {
        // Reset the node size and remove the stroke
        d3.select(this).transition().attr("r", 12).attr("stroke", null);
      });

    // Add text on top of the circles
    svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", (d: CustomNode) => d.x ?? 0)
      .attr("y", (d: CustomNode) => (d.y ? d.y + 3 : 0))
      .attr("text-anchor", "middle")
      .text((d: CustomNode) => d.label)
      .attr("fill", "#FFFF") // Text color
      .style("font-size", "10px")
      .style("pointer-events", "none") // Ensure text doesn't interfere with click events on circles
      .attr("class", "font-mono")
      .style("font-weight", "bold");

    addLegend(svg, totalLevels);

    return () => {
      svg.selectAll("*").remove(); // Cleanup
    };
  }, [nodes, links, levelNum]);

  return (
    <svg
      ref={svgRef}
      style={{
        width: "1000px",
        height: Object.keys(levelNum).length * 100 + 50,
      }}
    />
  );
};

export default DirectedGraph;

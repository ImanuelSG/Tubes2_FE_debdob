import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface Path {
  id: string;
  nodes: string[];
}

interface Props {
  paths: Path[];
}

const MyGraph: React.FC<Props> = ({ paths }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const maxLength = d3.max(paths.map(path => path.nodes.length));

    const nodeHeight = 30;
    const verticalSpacing = 20;
    const height = (paths.length + 1) * (nodeHeight + verticalSpacing);

    const yScale = d3.scaleLinear().domain([0, paths.length - 1]).range([0, height - nodeHeight]);

    const links = svg
      .selectAll('line')
      .data(paths)
      .enter()
      .append('line')
      .attr('x1', 50)
      .attr('y1', (d, i) => yScale(i) + nodeHeight / 2)
      .attr('x2', 150)
      .attr('y2', (d, i) => yScale(i + 1) + nodeHeight / 2)
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    const nodes = svg
      .selectAll('circle')
      .data(paths.flat().map(node => node.id).filter((value, index, self) => self.indexOf(value) === index))
      .enter()
      .append('circle')
      .attr('cx', 100)
      .attr('cy', d => yScale(paths.findIndex(path => path.nodes.map(node => node.id).includes(d))) + nodeHeight / 2)
      .attr('r', 8)
      .attr('fill', 'steelblue');

    const labels = svg
      .selectAll(null)
      .data(paths.flat().map(node => node.id).filter((value, index, self) => self.indexOf(value) === index))
      .enter()
      .append('text')
      .attr('x', 130)
      .attr('y', d => yScale(paths.findIndex(path => path.nodes.map(node => node.id).includes(d))) + nodeHeight / 2)
      .attr('dy', '.35em')
      .text(d => d);

    const simulation = d3.forceSimulation(paths.flat().map(node => node.id).filter((value, index, self) => self.indexOf(value) === index))
      .force('x', d3.forceX(100))
      .force('y', d3.forceY(d => yScale(paths.findIndex(path => path.nodes.map(node => node.id).includes(d))) + nodeHeight / 2))
      .force('collide', d3.forceCollide(10))
      .stop();

    for (let i = 0; i < 100; ++i) simulation.tick();

    return () => {
      simulation.stop();
    };
  }, [paths]);

  return <svg ref={svgRef} width="200" height="400"></svg>;
};

export default MyGraph;

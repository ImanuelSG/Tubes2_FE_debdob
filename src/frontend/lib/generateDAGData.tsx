import type { CustomNode, Edge } from "./types";

// Sample input paths with Wikipedia links

// Function to extract a readable label from a Wikipedia link
const extractLabelFromLink = (link: string): string => {
  const segments = link.split("/");
  return decodeURIComponent(segments[segments.length - 1].replace(/_/g, " ")); // Extract the title
};

// Function to generate nodes and links for a DAG from paths
const generateDAGData = (
  paths: string[][]
): {
  nodes: CustomNode[];
  Edges: Edge[];
  numNodeLevel: Record<number, number>;
} => {
  const nodeSet = new Set<string>();
  const EdgesData: Edge[] = [];
  const numNodeLevels: Record<number, number> = {};
  const nodeLevels: Record<string, number> = {};

  paths.forEach((path) => {
    path.forEach((link, index) => {
      nodeSet.add(link);
      if (index < path.length - 1) {
        EdgesData.push({ source: path[index], target: path[index + 1] });
      }

      if (!nodeLevels[link]) {
        nodeLevels[link] = index; // Determine node level based on its position in the path
      }
    });
  });

  const nodes = Array.from(nodeSet).map((link) => ({
    id: link,
    label: extractLabelFromLink(link), // Get the label from the link
    link,
    level: nodeLevels[link], // Assign level for layout
  }));

  nodes.forEach((node) => {
    numNodeLevels[node.level] = (numNodeLevels[node.level] || 0) + 1;
  });

  return { nodes, Edges: EdgesData, numNodeLevel: numNodeLevels };
};

export default generateDAGData;

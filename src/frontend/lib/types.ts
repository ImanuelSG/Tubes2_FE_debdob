// Node and Link interfaces for TypeScript
interface CustomNode {
  id: string; // Identifier
  label: string; // Page title extracted from the link
  link: string; // Wikipedia link
  level?: number; // Level for layout
  x?: number;
  y?: number;
}

interface Edge {
  source: string;
  target: string;
}

// Using `export type` to explicitly export types
export type { CustomNode, Edge };

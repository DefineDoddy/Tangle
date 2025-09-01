import React, { createContext, useContext } from "react";
import { Edge, Node, NodeChange, EdgeChange, Connection } from "@xyflow/react";

export const initialNodes: Node[] = [
  { id: "start", type: "start", position: { x: 0, y: 0 }, data: {} },
  { id: "n1", type: "dialogue", position: { x: 800, y: -40 }, data: {} },
  { id: "n2", type: "choice", position: { x: 300, y: -40 }, data: {} }
];

export const initialEdges: Edge[] = [];

export type GraphState = {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (edgeOrConnection: Edge | Connection) => void;

  addNodeFromType: (type: string, position: { x: number; y: number }) => void;
};

export const GraphContext = createContext<GraphState | null>(null);

export function useGraphState(): GraphState {
  const ctx = useContext(GraphContext);
  if (!ctx) throw new Error("useGraphState must be used inside GraphProvider");
  return ctx;
}

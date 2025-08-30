import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls
} from "@xyflow/react";
import { nodeTypes } from "./nodes/node-types";
import ConnectionLine from "./ConnectionLine";

const initialNodes = [
  { id: "start", type: "start", position: { x: 0, y: 0 }, data: { label: "Start" } },
  { id: "n1", type: "dialogue", position: { x: 300, y: -40 }, data: { label: "Node 1" } },
  { id: "n2", type: "choice", position: { x: 800, y: -40 }, data: { label: "Node 2" } }
];

const initialEdges = [{ id: "start-n1", source: "start", target: "n1" }];

export default function Graph(): React.JSX.Element {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        colorMode={window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"}
        nodeTypes={nodeTypes}
        snapGrid={[16, 16]}
        snapToGrid
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineComponent={ConnectionLine}
        isValidConnection={(connection) => {
          return connection.source !== connection.target;
        }}
        fitView
        minZoom={0.2}
        maxZoom={1}
      >
        <Background
          gap={32}
          size={2}
          color="var(--color-muted)"
          bgColor="var(--color-background)"
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}

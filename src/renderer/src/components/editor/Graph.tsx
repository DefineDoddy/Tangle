import { useState, useCallback } from "react";
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background } from "@xyflow/react";
import { nodeTypes } from "./nodes/node-types";

const initialNodes = [
  { id: "start", type: "start", position: { x: 0, y: 0 }, data: { label: "Start" } },
  { id: "n1", type: "dialogue", position: { x: 0, y: 100 }, data: { label: "Node 1" } }
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
        colorMode="dark"
        nodeTypes={nodeTypes}
        snapGrid={[16, 16]}
        snapToGrid
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background gap={16} size={1} color="#333" />
      </ReactFlow>
    </div>
  );
}

import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  SelectionMode,
  Node,
  NodeChange,
  EdgeChange,
  Connection,
  Edge
} from "@xyflow/react";
import { nodeTypes } from "./nodes/node-types";
import ConnectionLine from "./ConnectionLine";
import GraphControl from "./GraphControl";

const initialNodes = [
  {
    id: "start",
    type: "start",
    position: { x: 0, y: 0 },
    draggable: false,
    deletable: false
  },
  { id: "n1", type: "dialogue", position: { x: 300, y: -40 } },
  { id: "n2", type: "choice", position: { x: 800, y: -40 } }
] as Node[];

const initialEdges = [] as Edge[];

export default function Graph(): React.JSX.Element {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (edgeOrConnection: Edge | Connection) =>
      setEdges((edgesSnapshot) => addEdge(edgeOrConnection, edgesSnapshot)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        proOptions={{ hideAttribution: true }}
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
        panOnDrag={false}
        selectionOnDrag={true}
        selectionKeyCode={null}
        selectionMode={SelectionMode.Partial}
        deleteKeyCode={["Delete", "Backspace"]}
      >
        <Background
          gap={32}
          size={2}
          color="var(--color-muted)"
          bgColor="var(--color-background)"
        />
        <GraphControl />
        <Controls />
      </ReactFlow>
    </div>
  );
}

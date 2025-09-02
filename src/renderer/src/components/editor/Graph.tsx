import { ReactFlow, Background, Controls, SelectionMode, useReactFlow } from "@xyflow/react";
import { nodeTypes } from "./nodes/node-types";
import ConnectionLine from "./edge/ConnectionLine";
import GraphControl from "./GraphControl";
import { useAppState } from "./state/app-provider";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useCallback, useEffect } from "react";

export default function Graph(): React.JSX.Element {
  const state = useAppState();
  const { screenToFlowPosition, setViewport } = useReactFlow();
  const dragAndDrop = useDragAndDrop();

  const onDrop = useCallback(
    (evt: React.DragEvent) => {
      evt.preventDefault();
      console.log("onDrop", { type: dragAndDrop.type });
      if (!dragAndDrop.type) return;

      const position = screenToFlowPosition({
        x: evt.clientX,
        y: evt.clientY
      });
      const newNode = {
        id: `${Date.now()}`,
        type: dragAndDrop.type,
        position,
        data: { label: `${dragAndDrop.type} node` }
      };

      state.setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, state, dragAndDrop.type]
  );

  const onDragOver = useCallback((evt: React.DragEvent) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  }, []);

  function onDragStart(evt: React.DragEvent): void {
    //evt.dataTransfer.setData("text/plain", dragAndDrop.type);
    evt.dataTransfer.effectAllowed = "move";
  }

  useEffect(() => {
    setViewport(state.viewport);
    console.log("Set viewport to", state.viewport);
  }, [state.isLoaded]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        colorMode={window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"}
        nodeTypes={nodeTypes}
        snapGrid={[16, 16]}
        snapToGrid
        nodes={state.nodes}
        edges={state.edges}
        onNodesChange={state.onNodesChange}
        onEdgesChange={state.onEdgesChange}
        onConnect={state.onConnect}
        connectionLineComponent={ConnectionLine}
        isValidConnection={(connection) => {
          return connection.source !== connection.target;
        }}
        minZoom={0.2}
        maxZoom={1}
        panOnDrag={false}
        selectionOnDrag={true}
        selectionKeyCode={null}
        selectionMode={SelectionMode.Partial}
        deleteKeyCode={["Delete", "Backspace"]}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
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

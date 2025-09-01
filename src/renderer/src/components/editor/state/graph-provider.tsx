import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange
} from "@xyflow/react";
import { ReactNode, useCallback, useState } from "react";
import { GraphContext, initialEdges, initialNodes } from "./graph-state";

export function GraphProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );

  const onConnect = useCallback(
    (edgeOrConnection: Edge | Connection) => setEdges((es) => addEdge(edgeOrConnection, es)),
    []
  );

  const addNodeFromType = useCallback((type: string, position: { x: number; y: number }) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: {}
    };
    setNodes((ns) => [...ns, newNode]);
  }, []);

  return (
    <GraphContext.Provider
      value={{
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNodeFromType
      }}
    >
      {children}
    </GraphContext.Provider>
  );
}

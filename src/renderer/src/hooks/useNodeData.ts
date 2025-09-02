import { useNodeId, useUpdateNodeInternals, Node } from "@xyflow/react";
import { useAppState } from "@/components/editor/state/app-provider";

/**
 * Custom hook for managing node data operations
 * Provides utilities for getting and setting data on the current node
 */
export function useNodeData(): {
  nodeId: string | null;
  currentNode: Node | undefined;
  getData: <T>(key: string, defaultValue: T) => T;
  setData: <T>(key: string, value: T) => void;
  updateData: (updates: Record<string, unknown>) => void;
} {
  const nodeId = useNodeId();
  const updateNodeInternals = useUpdateNodeInternals();
  const { nodes, setNodes } = useAppState();

  // Get the current node
  const currentNode = nodes.find((n) => n.id === nodeId);

  /**
   * Get a value from the current node's data
   * @param key - The data key to retrieve
   * @param defaultValue - Default value if key doesn't exist
   * @returns The value from node data or default value
   */
  const getData = <T>(key: string, defaultValue: T): T => {
    return (currentNode?.data?.[key] as T) ?? defaultValue;
  };

  /**
   * Set a value in the current node's data
   * @param key - The data key to set
   * @param value - The value to set
   */
  const setData = <T>(key: string, value: T): void => {
    if (!nodeId) return;

    setNodes((nodes) =>
      nodes.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, [key]: value } } : n))
    );
    updateNodeInternals(nodeId);
  };

  /**
   * Update multiple data keys at once
   * @param updates - Object with key-value pairs to update
   */
  const updateData = (updates: Record<string, unknown>): void => {
    if (!nodeId) return;

    setNodes((nodes) =>
      nodes.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, ...updates } } : n))
    );
    updateNodeInternals(nodeId);
  };

  return {
    nodeId,
    currentNode,
    getData,
    setData,
    updateData
  };
}

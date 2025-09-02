import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode
} from "react";
import {
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
} from "@xyflow/react";
import { AppState, defaultAppState, STORAGE_KEYS } from "./app-state";
import { storage } from "@/lib/storage";

export interface AppContextType {
  // Graph state
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (edgeOrConnection: Edge | Connection) => void;
  addNodeFromType: (type: string, position: { x: number; y: number }) => void;

  // UI state
  dockView: "root" | "components";
  setDockView: (view: "root" | "components") => void;
  viewport: { x: number; y: number; zoom: number };
  setViewport: (viewport: { x: number; y: number; zoom: number }) => void;

  // Settings
  autoSave: boolean;
  setAutoSave: (enabled: boolean) => void;

  // Storage operations
  isLoaded: boolean;
  saveState: () => Promise<void>;
  loadState: () => Promise<void>;
  resetState: () => Promise<void>;
  exportState: () => Promise<string>;
  importState: (stateJson: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function useAppState(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used inside AppProvider");
  return ctx;
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps): React.JSX.Element {
  const [state, setState] = useState<AppState>(defaultAppState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from storage on mount
  useEffect(() => {
    loadState();
  }, []);

  // Auto-save when state changes (if auto-save is enabled)
  useEffect(() => {
    if (isLoaded && state.settings.autoSave) {
      saveState();
    }
  }, [state, isLoaded]);

  const loadState = useCallback(async () => {
    try {
      // Try to load full state first
      const fullState = await storage.get<AppState>(STORAGE_KEYS.FULL_STATE);
      if (fullState) {
        setState(fullState);
        setIsLoaded(true);
        return;
      }

      // Fallback to loading individual parts
      const [graph, ui, settings] = await Promise.all([
        storage.get<AppState["graph"]>(STORAGE_KEYS.GRAPH),
        storage.get<AppState["ui"]>(STORAGE_KEYS.UI),
        storage.get<AppState["settings"]>(STORAGE_KEYS.SETTINGS)
      ]);

      setState((prevState) => ({
        graph: graph || prevState.graph,
        ui: ui || prevState.ui,
        settings: settings || prevState.settings
      }));
    } catch (error) {
      console.warn("Failed to load state from storage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveState = useCallback(async () => {
    try {
      // Save full state
      await storage.set(STORAGE_KEYS.FULL_STATE, state);

      // Also save individual parts for granular access
      await Promise.all([
        storage.set(STORAGE_KEYS.GRAPH, state.graph),
        storage.set(STORAGE_KEYS.UI, state.ui),
        storage.set(STORAGE_KEYS.SETTINGS, state.settings)
      ]);
    } catch (error) {
      console.warn("Failed to save state to storage:", error);
    }
  }, [state]);

  const resetState = useCallback(async () => {
    setState(defaultAppState);
    await storage.clear();
  }, []);

  const exportState = useCallback(async (): Promise<string> => {
    return JSON.stringify(state, null, 2);
  }, [state]);

  const importState = useCallback(
    async (stateJson: string) => {
      try {
        const importedState = JSON.parse(stateJson) as AppState;
        setState(importedState);
        await saveState();
      } catch (error) {
        console.error("Failed to import state:", error);
        throw new Error("Invalid state format");
      }
    },
    [saveState]
  );

  // Graph state handlers
  const setNodes = useCallback((nodes: React.SetStateAction<Node[]>) => {
    setState((prevState) => ({
      ...prevState,
      graph: {
        ...prevState.graph,
        nodes: typeof nodes === "function" ? nodes(prevState.graph.nodes) : nodes
      }
    }));
  }, []);

  const setEdges = useCallback((edges: React.SetStateAction<Edge[]>) => {
    setState((prevState) => ({
      ...prevState,
      graph: {
        ...prevState.graph,
        edges: typeof edges === "function" ? edges(prevState.graph.edges) : edges
      }
    }));
  }, []);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setState((prevState) => ({
      ...prevState,
      graph: {
        ...prevState.graph,
        nodes: applyNodeChanges(changes, prevState.graph.nodes)
      }
    }));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setState((prevState) => ({
      ...prevState,
      graph: {
        ...prevState.graph,
        edges: applyEdgeChanges(changes, prevState.graph.edges)
      }
    }));
  }, []);

  const onConnect = useCallback((edgeOrConnection: Edge | Connection) => {
    setState((prevState) => ({
      ...prevState,
      graph: {
        ...prevState.graph,
        edges: addEdge(edgeOrConnection, prevState.graph.edges)
      }
    }));
  }, []);

  const addNodeFromType = useCallback((type: string, position: { x: number; y: number }) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: {}
    };
    setState((prevState) => ({
      ...prevState,
      graph: {
        ...prevState.graph,
        nodes: [...prevState.graph.nodes, newNode]
      }
    }));
  }, []);

  // UI state handlers
  const setDockView = useCallback((view: "root" | "components") => {
    setState((prevState) => ({
      ...prevState,
      ui: {
        ...prevState.ui,
        dockView: view
      }
    }));
  }, []);

  const setViewport = useCallback((viewport: { x: number; y: number; zoom: number }) => {
    setState((prevState) => ({
      ...prevState,
      ui: {
        ...prevState.ui,
        viewport
      }
    }));
  }, []);

  // Settings handlers
  const setAutoSave = useCallback((enabled: boolean) => {
    setState((prevState) => ({
      ...prevState,
      settings: {
        ...prevState.settings,
        autoSave: enabled
      }
    }));
  }, []);

  const contextValue: AppContextType = {
    // Graph state
    nodes: state.graph.nodes,
    edges: state.graph.edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNodeFromType,

    // UI state
    dockView: state.ui.dockView,
    setDockView,
    viewport: state.ui.viewport,
    setViewport,

    // Settings
    autoSave: state.settings.autoSave,
    setAutoSave,

    // Storage operations
    isLoaded,
    saveState,
    loadState,
    resetState,
    exportState,
    importState
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

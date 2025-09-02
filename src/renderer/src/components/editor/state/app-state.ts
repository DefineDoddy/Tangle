import { Edge, Node } from "@xyflow/react";

export interface AppState {
  graph: {
    nodes: Node[];
    edges: Edge[];
  };

  ui: {
    dockView: "root" | "components";
    viewport: {
      x: number;
      y: number;
      zoom: number;
    };
    // theme: "light" | "dark";
    // sidebarOpen: boolean;
    // selectedNodeId: string | null;
  };

  // Application settings
  settings: {
    autoSave: boolean;
    // gridSnap: boolean;
  };
}

export const defaultAppState: AppState = {
  graph: {
    nodes: [
      { id: "start", type: "start", position: { x: 0, y: 0 }, data: {}, draggable: false },
      { id: "n1", type: "dialogue", position: { x: 800, y: -40 }, data: {} },
      { id: "n2", type: "choice", position: { x: 300, y: -40 }, data: {} }
    ],
    edges: []
  },
  ui: {
    dockView: "root",
    viewport: {
      x: 0,
      y: 0,
      zoom: 1
    }
  },
  settings: {
    autoSave: true
  }
};

export const STORAGE_KEYS = {
  GRAPH: "graph",
  UI: "ui",
  SETTINGS: "settings",
  FULL_STATE: "app_state"
} as const;

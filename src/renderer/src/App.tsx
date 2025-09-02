import Graph from "./components/editor/Graph";
import AppDock from "./components/editor/AppDock";
import { AppProvider } from "./components/editor/state/app-provider";
import DragAndDropProvider from "./hooks/useDragAndDrop";
import { ReactFlowProvider } from "@xyflow/react";

function App(): React.JSX.Element {
  return (
    <ReactFlowProvider>
      <AppProvider>
        <DragAndDropProvider>
          <Graph />
          <AppDock />
        </DragAndDropProvider>
      </AppProvider>
    </ReactFlowProvider>
  );
}

export default App;

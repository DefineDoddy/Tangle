import Graph from "./components/editor/Graph";
import AppDock from "./components/editor/AppDock";
import { GraphProvider } from "./components/editor/state/graph-provider";
import DragAndDropProvider from "./hooks/useDragAndDrop";
import { ReactFlowProvider } from "@xyflow/react";

function App(): React.JSX.Element {
  return (
    <ReactFlowProvider>
      <GraphProvider>
        <DragAndDropProvider>
          <Graph />
          <AppDock />
        </DragAndDropProvider>
      </GraphProvider>
    </ReactFlowProvider>
  );
}

export default App;

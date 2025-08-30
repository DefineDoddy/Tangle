import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

function StartNode(): React.JSX.Element {
  return (
    <div>
      <Handle type="target" position={Position.Right} className="node-connection-handle" />

      <div className="px-8 py-3 rounded-full bg-green-600 border shadow-sm">
        <span className="text-foreground font-black text-xl uppercase tracking-wider">Start</span>
      </div>
    </div>
  );
}

export default memo(StartNode);

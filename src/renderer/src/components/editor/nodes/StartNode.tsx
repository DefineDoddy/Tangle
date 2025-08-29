import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

function StartNode(): React.JSX.Element {
  return (
    <div>
      <Handle type="target" position={Position.Right} />
      <div className="px-5 py-2 rounded-sm bg-green-500 border border-border shadow-sm flex">
        <span className="text-foreground font-bold text-sm">START</span>
      </div>
    </div>
  );
}

export default memo(StartNode);

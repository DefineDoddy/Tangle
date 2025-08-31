import { memo } from "react";
import { Position } from "@xyflow/react";
import NodeHandle from "../NodeHandle";
import { cn } from "@/lib/utils";

function StartNode(): React.JSX.Element {
  return (
    <div>
      <NodeHandle type="target" position={Position.Right} maxConnections={1} />

      <button
        className={cn(
          "px-8 py-3 rounded-full bg-green-600 border-2 border-white/50 shadow-sm",
          "hover:scale-110 active:scale-90 spring-bounce-40 spring-duration-200"
        )}
      >
        <span className="text-foreground font-black text-xl uppercase tracking-wider">Start</span>
      </button>
    </div>
  );
}

export default memo(StartNode);

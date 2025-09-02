import { memo } from "react";
import { Position } from "@xyflow/react";
import NodeHandle from "../edge/NodeHandle";
import { cn } from "@/lib/utils";

function StartNode(): React.JSX.Element {
  return (
    <div>
      <NodeHandle type="target" position={Position.Right} maxConnections={1} />

      <button
        className={cn(
          "group relative px-8 py-3 rounded-full bg-green-600 border-2 border-white/50 shadow-sm",
          "hover:scale-110 active:scale-90 spring-bounce-40 spring-duration-200",
          "hover:shadow-md hover:border-white/70 transition-all duration-200"
        )}
      >
        <span className="text-foreground font-black text-xl uppercase tracking-wider">Start</span>

        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </button>
    </div>
  );
}

export default memo(StartNode);

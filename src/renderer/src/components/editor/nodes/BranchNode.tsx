import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { nodeDefs } from "./node-types";

function BranchNode(): React.JSX.Element {
  return (
    <div className="min-w-75 max-w-120">
      <Handle type="source" position={Position.Left} className="node-connection-handle" />
      {/* TODO: change to multiple outputs like choice node */}
      <Handle type="target" position={Position.Right} className="node-connection-handle" />

      <div className="group relative p-4 rounded-lg bg-card border shadow-sm flex flex-col gap-4 transition-all duration-200 hover:shadow-md hover:border-primary/50">
        <div className="flex gap-3 items-center">
          <nodeDefs.branch.icon />
          <span className="text-foreground font-semibold text-lg">Branch</span>
        </div>

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>
    </div>
  );
}

export default memo(BranchNode);

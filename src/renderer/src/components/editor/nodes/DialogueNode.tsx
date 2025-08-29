import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

function DialogueNode(): React.JSX.Element {
  return (
    <div>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      <div className="px-5 py-2 rounded-sm bg-card border border-border shadow-sm flex flex-col gap-2">
        <span className="text-foreground font-bold text-xs">DIALOGUE</span>
        <input
          className="border border-border rounded-sm p-1"
          placeholder="Type your dialogue here..."
        />
      </div>
    </div>
  );
}

export default memo(DialogueNode);

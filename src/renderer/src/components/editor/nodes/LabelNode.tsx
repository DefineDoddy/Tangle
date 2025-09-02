import { memo, useState, useRef, useEffect } from "react";
import { Position } from "@xyflow/react";
import NodeHandle from "../edge/NodeHandle";
import { useNodeData } from "@/hooks/useNodeData";
import { nodeDefs } from "./node-types";
import { cn } from "@/lib/utils";

function LabelNode(): React.JSX.Element {
  const { getData, setData } = useNodeData();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const name = getData<string>("name", "");

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = (): void => {
    if (!isEditing) {
      setTempValue(name);
      setIsEditing(true);
    }
  };

  const handleBlur = (): void => {
    if (tempValue.trim()) {
      setData("name", tempValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setTempValue(name);
      setIsEditing(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTempValue(e.target.value);
  };

  return (
    <div className="min-w-32 max-w-80">
      <NodeHandle type="target" position={Position.Right} maxConnections={1} />

      <div
        className={cn(
          "group relative rounded-lg bg-card border shadow-sm transition-all duration-200",
          "hover:shadow-md hover:border-primary/50",
          isEditing ? "ring-2 ring-primary/20" : ""
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3 p-3">
          <nodeDefs.label.icon />

          {isEditing ? (
            <input
              ref={inputRef}
              className="text-foreground font-medium bg-transparent outline-none flex-1 min-w-0 nodrag"
              value={tempValue}
              onChange={handleInput}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="Enter label..."
            />
          ) : (
            <span className="text-foreground flex-1 min-w-0">{name || "Click to add label"}</span>
          )}
        </div>

        {!isEditing && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        )}
      </div>
    </div>
  );
}

export default memo(LabelNode);

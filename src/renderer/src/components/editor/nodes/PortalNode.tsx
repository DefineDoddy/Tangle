import { memo, useState, useEffect } from "react";
import { Position } from "@xyflow/react";
import NodeHandle from "../edge/NodeHandle";
import { useNodeData } from "@/hooks/useNodeData";
import { nodeDefs } from "./node-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useNodes } from "@xyflow/react";

function PortalNode(): React.JSX.Element {
  const { getData, setData } = useNodeData();
  const nodes = useNodes();
  const [availableLabels, setAvailableLabels] = useState<string[]>([]);

  const targetLabel = getData<string>("targetLabel", "");

  useEffect(() => {
    const labels = nodes
      .filter((node) => node.type === "label" && node.data?.name)
      .map((node) => node.data.name)
      .filter((label, index, arr) => arr.indexOf(label) === index) as string[];

    setAvailableLabels(labels);

    if (targetLabel && !labels.includes(targetLabel)) {
      if (labels.length > 0) {
        setData("targetLabel", labels[0]);
      } else {
        setData("targetLabel", "");
      }
    }
  }, [nodes, targetLabel]);

  const handleLabelChange = (label: string): void => {
    setData("targetLabel", label);
  };

  return (
    <div className="min-w-48 max-w-80">
      <NodeHandle type="source" position={Position.Left} />

      <div className="group relative p-4 rounded-lg bg-card border shadow-sm flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:border-primary/50">
        <div className="flex items-center gap-3">
          <nodeDefs.portal.icon />
          <span className="text-foreground font-semibold text-lg">Portal</span>

          <Select
            value={targetLabel}
            onValueChange={handleLabelChange}
            disabled={availableLabels.length === 0}
          >
            <SelectTrigger className="nodrag">
              <SelectValue
                placeholder={availableLabels.length === 0 ? "No labels" : "Select label"}
              />
            </SelectTrigger>
            <SelectContent>
              {availableLabels.map((label) => (
                <SelectItem key={label} value={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {targetLabel && (
          <div className="text-sm text-muted-foreground">
            Teleports to: <span className="font-medium text-foreground">{targetLabel}</span>
          </div>
        )}

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>
    </div>
  );
}

export default memo(PortalNode);

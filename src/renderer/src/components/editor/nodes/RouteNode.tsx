import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { nodeDefs } from "./node-types";
import { useNodeData } from "../../../hooks/useNodeData";

function RouteNode(): React.JSX.Element {
  const { getData, setData } = useNodeData();

  const rot = getData<number>("rot", 0);

  const rotate = (newRotation: number): void => {
    setData("rot", newRotation);
  };

  const getHandlePosition = (basePosition: Position): Position => {
    const positions = [Position.Top, Position.Right, Position.Bottom, Position.Left];
    const baseIndex = positions.indexOf(basePosition);
    const rotationSteps = rot / 90;
    const newIndex = (baseIndex + rotationSteps) % 4;
    return positions[newIndex];
  };

  return (
    <div>
      <Handle
        type="source"
        position={getHandlePosition(Position.Left)}
        className="node-connection-handle"
      />
      <Handle
        type="target"
        position={getHandlePosition(Position.Right)}
        className="node-connection-handle"
      />

      <div className="group relative p-2 rounded-lg bg-card border shadow-sm flex flex-col gap-4 transition-all duration-200 hover:shadow-md hover:border-primary/50">
        <button
          className="p-2 rounded-md hover:bg-accent active:scale-90 transition-transform duration-200"
          onClick={() => rotate(rot + 90)}
          style={{ transform: `rotate(${rot}deg)` }}
        >
          <nodeDefs.route.icon />
        </button>

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>
    </div>
  );
}

export default memo(RouteNode);

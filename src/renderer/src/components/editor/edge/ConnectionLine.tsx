import React from "react";

export default function ConnectionLine({
  fromX,
  fromY,
  toX,
  toY
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}): React.JSX.Element {
  return (
    <path
      fill="none"
      stroke="gray"
      strokeWidth={2}
      strokeLinecap="round"
      className="animated"
      d={`M${fromX},${fromY} C ${fromX + (toX - fromX) * 0.5},${fromY} ${toX - (toX - fromX) * 0.5},${toY} ${toX},${toY}`}
    />
  );
}

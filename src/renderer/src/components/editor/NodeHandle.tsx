import React from "react";
import { Handle, useNodeConnections, HandleProps } from "@xyflow/react";

export default function NodeHandle(
  props: {
    maxConnections?: number;
  } & HandleProps
): React.JSX.Element {
  const connections = useNodeConnections({
    handleType: props.type
  });

  return (
    <Handle
      {...props}
      isConnectable={props.maxConnections ? connections.length < props.maxConnections : true}
      className="node-connection-handle"
    />
  );
}

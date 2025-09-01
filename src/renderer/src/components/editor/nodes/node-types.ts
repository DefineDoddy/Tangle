import { MessageSquareMoreIcon, PlayIcon, ScaleIcon } from "lucide-react";
import ChoiceNode from "./ChoiceNode";
import DialogueNode from "./DialogueNode";
import StartNode from "./StartNode";
import React from "react";

type NodeDefinition = {
  name: string;
  component: React.ComponentType;
  icon: React.ComponentType;
  creatable?: boolean;
};

export const nodeDefs: Record<string, NodeDefinition> = {
  start: {
    name: "Start",
    component: StartNode,
    icon: PlayIcon, // LandPlotIcon?
    creatable: false
  },
  dialogue: {
    name: "Dialogue",
    component: DialogueNode,
    icon: MessageSquareMoreIcon
  },
  choice: {
    name: "Choice",
    component: ChoiceNode,
    icon: ScaleIcon
  }
};

export const nodeTypes = {
  start: StartNode,
  dialogue: DialogueNode,
  choice: ChoiceNode
};

import {
  ListVideoIcon,
  MessageSquareMoreIcon,
  NotepadTextIcon,
  PlayIcon,
  RouteIcon,
  ScaleIcon,
  ShellIcon
} from "lucide-react";
import ChoiceNode from "./ChoiceNode";
import DialogueNode from "./DialogueNode";
import StartNode from "./StartNode";
import React from "react";
import RouteNode from "./RouteNode";
import NoteNode from "./NoteNode";
import LabelNode from "./LabelNode";
import PortalNode from "./PortalNode";

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
  },
  label: {
    name: "Label",
    component: LabelNode,
    icon: ListVideoIcon
  },
  portal: {
    name: "Portal",
    component: PortalNode,
    icon: ShellIcon
  },
  route: {
    name: "Route",
    component: RouteNode,
    icon: RouteIcon
  },
  note: {
    name: "Note",
    component: NoteNode,
    icon: NotepadTextIcon
  }
};

export const nodeTypes = {
  start: StartNode,
  dialogue: DialogueNode,
  choice: ChoiceNode,
  label: LabelNode,
  portal: PortalNode,
  route: RouteNode,
  note: NoteNode
};

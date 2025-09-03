import {
  ListVideoIcon,
  MegaphoneIcon,
  MessageSquareMoreIcon,
  NotepadTextIcon,
  PlayIcon,
  RouteIcon,
  ScaleIcon,
  ShellIcon,
  SigmaIcon,
  SplitIcon
} from "lucide-react";
import ChoiceNode from "./ChoiceNode";
import DialogueNode from "./DialogueNode";
import StartNode from "./StartNode";
import React from "react";
import RouteNode from "./RouteNode";
import NoteNode from "./NoteNode";
import LabelNode from "./LabelNode";
import PortalNode from "./PortalNode";
import BranchNode from "./BranchNode";

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
  branch: {
    name: "Branch",
    component: BranchNode,
    icon: SplitIcon
  },
  variable: {
    name: "Variable",
    component: BranchNode,
    icon: SigmaIcon
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
  event: {
    name: "Event",
    component: BranchNode,
    icon: MegaphoneIcon
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
  branch: BranchNode,
  label: LabelNode,
  portal: PortalNode,
  route: RouteNode,
  note: NoteNode
};

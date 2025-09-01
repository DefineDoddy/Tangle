import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { cn } from "@/lib/utils";
import {
  ComponentIcon,
  MousePointer2Icon,
  PlayIcon,
  SearchIcon,
  ArrowLeftIcon
} from "lucide-react";
import React, { useState } from "react";
import { nodeDefs } from "./nodes/node-types";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

type DockItem = BaseDockItem | ComponentDockItem;
type ComponentDockItem = BaseDockItem & { type: string };
type BaseDockItem = {
  id: string;
  title: string;
  icon: React.ReactElement;
  draggable?: boolean;
  onClick?: () => void;
};

export default function AppDock(): React.JSX.Element {
  const [view, setView] = useState<"root" | "components">("root");

  const rootItems: DockItem[] = [
    { id: "mode", title: "Mode", icon: <MousePointer2Icon /> },
    {
      id: "components",
      title: "Components",
      icon: <ComponentIcon />,
      onClick: () => setView("components")
    },
    { id: "search", title: "Search", icon: <SearchIcon /> },
    { id: "preview", title: "Preview", icon: <PlayIcon /> }
  ];

  const componentItems: DockItem[] = [
    {
      id: "back",
      title: "Back",
      icon: <ArrowLeftIcon />,
      onClick: () => setView("root")
    },
    ...Object.entries(nodeDefs)
      .filter(([, node]) => node.creatable !== false)
      .map(([key, node]) => ({
        id: key,
        type: key,
        title: node.name,
        icon: <node.icon />,
        draggable: true
      }))
  ];

  const items = view === "root" ? rootItems : componentItems;
  const [dragging, setDragging] = useState<string | null>(null);
  const dragAndDrop = useDragAndDrop();

  return (
    <div className="absolute bottom-10 left-1/2 max-w-full -translate-x-1/2">
      <Dock
        className="items-end pb-3 shadow-lg shadow-black/75 border"
        magnification={dragging ? 40 : 80}
      >
        {items.map((item, index) => (
          <div
            key={index}
            draggable={item.draggable}
            className="active:scale-80 spring-bounce-40 spring-duration-200"
            onDragStart={() => {
              setDragging(item.id);
              if ("type" in item) dragAndDrop.setType(item.type);
            }}
            onDragEnd={() => {
              setDragging(null);
              dragAndDrop.setType(null);
            }}
          >
            <DockItem
              onClick={() => {
                if (!dragging) item.onClick?.();
              }}
              className={cn(
                "aspect-square rounded-lg",
                "transition-[background-color,box-shadow,scale,border-radius] spring-bounce-40 spring-duration-200",
                "bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700",
                "hover:shadow-md shadow-black/50 hover:border"
              )}
            >
              {dragging !== item.id ? (
                <DockLabel className="select-none">{item.title}</DockLabel>
              ) : (
                <div></div>
              )}
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </div>
        ))}
      </Dock>
    </div>
  );
}

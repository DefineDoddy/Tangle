import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { cn } from "@/lib/utils";
import { ComponentIcon, MousePointer2Icon } from "lucide-react";
import React from "react";

const data = [
  {
    title: "Mode",
    icon: <MousePointer2Icon />,
    href: "#"
  },
  {
    title: "Components",
    icon: <ComponentIcon />,
    href: "#"
  }
];

export default function AppDock(): React.JSX.Element {
  return (
    <div className="absolute bottom-10 left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end pb-3 shadow-lg shadow-black/75 border">
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className={cn(
              "aspect-square rounded-lg cursor-pointer",
              "transition-[background-color,box-shadow,scale,border-radius] spring-bounce-40 spring-duration-200",
              "bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700",
              "hover:shadow-md shadow-black/50 hover:border active:scale-80"
            )}
          >
            <DockLabel className="select-none">{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}

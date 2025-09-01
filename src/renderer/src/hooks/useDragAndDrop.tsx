import React, { createContext, useContext, useState } from "react";

type DragAndDropContext = {
  type: string | null;
  setType: (type: string | null) => void;
};

const DragAndDropContext = createContext<DragAndDropContext | undefined>(undefined);

export default function DragAndDropProvider({
  children
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [type, setType] = useState<string | null>(null);

  return (
    <DragAndDropContext.Provider value={{ type, setType }}>{children}</DragAndDropContext.Provider>
  );
}

export function useDragAndDrop(): DragAndDropContext {
  const context = useContext(DragAndDropContext);
  if (!context) {
    throw new Error("useDragAndDrop must be used within a DragAndDropProvider");
  }
  return context;
}

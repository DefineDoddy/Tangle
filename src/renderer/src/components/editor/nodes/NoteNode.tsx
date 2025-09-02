import { memo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { nodeDefs } from "./node-types";
import { useNodeData } from "@/hooks/useNodeData";

function NoteNode(): React.JSX.Element {
  const { getData, setData } = useNodeData();

  const content = getData<string>("content", "");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setData("content", e.target.value);
  };

  return (
    <div className="min-w-75 max-w-90">
      <div className="group relative p-4 rounded-lg bg-card border shadow-sm flex flex-col gap-4 transition-all duration-200 hover:shadow-md hover:border-primary/50">
        <div className="flex gap-3 items-center">
          <nodeDefs.note.icon />
          <span className="text-foreground font-semibold text-lg">Note</span>
        </div>
        <Textarea
          placeholder="Create a new note..."
          className="nodrag max-h-60 resize-none"
          value={content}
          onChange={handleInput}
        />

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>
    </div>
  );
}

export default memo(NoteNode);

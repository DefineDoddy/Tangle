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
    <div className="min-w-75 max-w-90 active:-rotate-2 shadow-xl active:shadow-black">
      <div className="group relative p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-200 border-2 border-yellow-300 shadow-lg flex flex-col gap-4 transition-all duration-200 hover:shadow-xl hover:border-yellow-400 hover:scale-105 transform">
        <div className="flex gap-3 items-center">
          <div className="text-yellow-600">
            <nodeDefs.note.icon />
          </div>
          <span className="text-yellow-800 font-bold text-lg">Note</span>
        </div>
        <Textarea
          placeholder="Create a new note..."
          className="nodrag max-h-60 resize-none bg-yellow-50/50 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/20 text-background"
          value={content}
          onChange={handleInput}
        />

        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-200/20 via-transparent to-yellow-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

        {/* Sticky note corner fold effect */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-yellow-400/60" />
      </div>
    </div>
  );
}

export default memo(NoteNode);

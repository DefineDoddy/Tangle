import { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { nodeDefs } from "./node-types";
import { useNodeData } from "@/hooks/useNodeData";

function DialogueNode(): React.JSX.Element {
  const [placeholder] = useState(() => {
    const placeholders = [
      "Hey, did you finish the report?",
      "I can't believe we pulled that off!",
      "Where did you hide the key?",
      "Let's meet at the café at 3 - sound good?",
      "No worries, I'll handle the deployment tonight.",
      "Be careful - that route is blocked by construction.",
      "Thanks for the help. I owe you one."
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  });

  const { getData, setData } = useNodeData();

  const content = getData<string>("content", "");
  const character = getData<string>("character", "");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setData("content", e.target.value);
  };

  const handleCharacterChange = (character: string): void => {
    setData("character", character);
  };

  return (
    <div className="min-w-75 max-w-120">
      <Handle type="source" position={Position.Left} className="node-connection-handle" />
      <Handle type="target" position={Position.Right} className="node-connection-handle" />

      <div className="group relative p-4 rounded-lg bg-card border shadow-sm flex flex-col gap-4 transition-all duration-200 hover:shadow-md hover:border-primary/50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-3 items-center">
            <nodeDefs.dialogue.icon />
            <span className="text-foreground font-semibold text-lg">Dialogue</span>
          </div>

          <Select value={character || "you"} onValueChange={handleCharacterChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a character" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="you">You</SelectItem>
              <SelectItem value="evelyn">Evelyn</SelectItem>
              <SelectItem value="jasper">Jasper</SelectItem>
              <SelectItem value="lucas">Lucas</SelectItem>
              <SelectItem value="sophie">Sophie</SelectItem>
              <SelectItem value="thomas">Thomas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          placeholder={placeholder}
          className="nodrag max-h-60 resize-none"
          value={content}
          onChange={handleInput}
        />

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>
    </div>
  );
}

export default memo(DialogueNode);

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

  return (
    <div className="min-w-75 max-w-120">
      <Handle type="source" position={Position.Left} className="node-connection-handle" />
      <Handle type="target" position={Position.Right} className="node-connection-handle" />

      <div className="p-5 rounded-lg bg-card border shadow-sm flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-foreground font-semibold text-lg">Dialogue</span>
          <Select value="evelyn">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a character" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="evelyn">Evelyn</SelectItem>
              <SelectItem value="jasper">Jasper</SelectItem>
              <SelectItem value="lucas">Lucas</SelectItem>
              <SelectItem value="sophie">Sophie</SelectItem>
              <SelectItem value="thomas">Thomas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea placeholder={placeholder} className="nodrag max-h-60 resize-none" />
      </div>
    </div>
  );
}

export default memo(DialogueNode);

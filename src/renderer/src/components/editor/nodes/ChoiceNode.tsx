import { memo, useState, useRef, useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { nodeDefs } from "./node-types";

function ChoiceNode(): React.JSX.Element {
  const [choices, setChoices] = useState<{ id: number; value: string }[]>([{ id: 0, value: "" }]);
  const nextId = useRef(1);

  const addChoice = useCallback(() => {
    setChoices((prev) => [...prev, { id: nextId.current++, value: "" }]);
  }, []);

  const removeChoice = useCallback((choiceId: number) => {
    setChoices((prev) => prev.filter((c) => c.id !== choiceId));
  }, []);

  const updateChoice = useCallback((choiceId: number, value: string) => {
    setChoices((prev) => prev.map((c) => (c.id === choiceId ? { ...c, value } : c)));
  }, []);

  return (
    <div className="min-w-75 max-w-120">
      <Handle type="source" position={Position.Left} className="node-connection-handle" />

      <div className="p-5 rounded-lg bg-card border shadow-sm flex flex-col gap-5">
        <div className="flex gap-3 items-center">
          <nodeDefs.choice.icon />
          <span className="text-foreground font-semibold text-lg">Choice</span>
        </div>

        <div className="flex flex-col gap-3">
          {choices.map((choice, index) => (
            <div key={choice.id} className="flex items-center gap-2">
              <Input
                className="nodrag"
                value={choice.value}
                onChange={(e) => updateChoice(choice.id, e.target.value)}
                placeholder={`Choice ${index + 1}`}
              />

              <Handle
                id={choice.id.toString()}
                type="target"
                position={Position.Right}
                className="node-connection-handle"
                style={{ top: 86 + index * 48 }}
              />

              {choices.length > 1 && (
                <Button
                  className="nodrag"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeChoice(choice.id)}
                >
                  <TrashIcon />
                </Button>
              )}
            </div>
          ))}

          <Button onClick={addChoice} className="nodrag">
            <PlusIcon />
            Add choice
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(ChoiceNode);

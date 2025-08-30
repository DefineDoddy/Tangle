import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

function DialogueNode(): React.JSX.Element {
  const [choices, setChoices] = useState<{ id: number; value: string }[]>([{ id: 0, value: "" }]);
  const nextId = useRef(1);

  const addChoice = useCallback(() => {
    setChoices((prev) => [...prev, { id: nextId.current++, value: "" }]);
  }, []);

  const updateChoice = useCallback((id: number, value: string) => {
    setChoices((prev) => prev.map((c) => (c.id === id ? { ...c, value } : c)));
  }, []);

  return (
    <div className="min-w-75 max-w-120">
      <Handle type="source" position={Position.Left} className="node-connection-handle" />
      <Handle type="target" position={Position.Right} className="node-connection-handle" />

      <div className="p-5 rounded-lg bg-card border shadow-sm flex flex-col gap-5">
        <span className="text-foreground font-semibold text-lg">Choice</span>

        <div className="flex flex-col gap-3">
          {choices.map((choice, index) => (
            <div key={choice.id} className="flex items-center gap-2">
              <Input
                className="nodrag"
                value={choice.value}
                onChange={(e) =>
                  updateChoice(choice.id, (e as React.ChangeEvent<HTMLInputElement>).target.value)
                }
                placeholder={`Choice ${index + 1}`}
              />
              {choices.length > 1 && (
                <Button
                  className="nodrag"
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    setChoices((prev) => prev.filter((c) => c.id !== choice.id));
                  }}
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

export default memo(DialogueNode);

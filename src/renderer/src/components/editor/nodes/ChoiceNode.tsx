import { memo, useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { nodeDefs } from "./node-types";
import { useNodeData } from "../../../hooks/useNodeData";

type Choice = { id: number; value: string };

function ChoiceNode(): React.JSX.Element {
  const { getData, setData } = useNodeData();

  const choices: Choice[] = getData<Choice[]>("choices", [{ id: 0, value: "" }]);

  // Add a new choice
  const addChoice = useCallback(() => {
    const newChoice = { id: choices.length, value: "" };
    setData("choices", [...choices, newChoice]);
  }, [choices, setData]);

  // Remove a choice by id
  const removeChoice = useCallback(
    (choiceId: number) => {
      const updated = choices.filter((c) => c.id !== choiceId);
      setData("choices", updated.length > 0 ? updated : [{ id: 0, value: "" }]);
    },
    [choices, setData]
  );

  // Update a choice's value
  const updateChoice = useCallback(
    (choiceId: number, value: string) => {
      setData(
        "choices",
        choices.map((c) => (c.id === choiceId ? { ...c, value } : c))
      );
    },
    [choices, setData]
  );

  return (
    <div className="min-w-75 max-w-120">
      <Handle type="source" position={Position.Left} className="node-connection-handle" />

      <div className="group relative p-4 rounded-lg bg-card border shadow-sm flex flex-col gap-4 transition-all duration-200 hover:shadow-md hover:border-primary/50">
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

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>
    </div>
  );
}

export default memo(ChoiceNode);

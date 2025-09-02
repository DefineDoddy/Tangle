import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useReactFlow } from "@xyflow/react";
import React, { useRef, useEffect, memo } from "react";
import { useAppState } from "./state/app-provider";

function GraphControl(): React.JSX.Element {
  const flow = useReactFlow();

  const isDragging = useRef(false);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);

  const { screenToFlowPosition } = useReactFlow();
  const state = useAppState();
  const dragAndDrop = useDragAndDrop();

  useEffect(() => {
    function isInsideFlowPane(target: EventTarget | null): boolean {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest(".react-flow__pane"));
    }

    function onMouseDown(evt: MouseEvent): void {
      if (evt.button !== 1) return;
      if (!isInsideFlowPane(evt.target)) return;

      evt.preventDefault();
      document.documentElement.style.setProperty("--cursor", "grabbing");

      isDragging.current = true;
      lastPosition.current = { x: evt.clientX, y: evt.clientY };
    }

    function onMouseMove(evt: MouseEvent): void {
      if (!isDragging.current) return;
      if (!lastPosition.current) return;

      const dx = evt.clientX - lastPosition.current.x;
      const dy = evt.clientY - lastPosition.current.y;
      lastPosition.current = { x: evt.clientX, y: evt.clientY };

      try {
        const viewport = flow.getViewport() || { x: 0, y: 0, zoom: 1 };

        flow.setViewport({
          x: viewport.x + dx,
          y: viewport.y + dy,
          zoom: viewport.zoom
        });
      } catch {
        // flow may not be available during early mount
      }
    }

    function onMouseUp(evt: MouseEvent): void {
      if (evt.button === 0) {
        if (dragAndDrop.type && isInsideFlowPane(evt.target)) {
          const position = screenToFlowPosition({
            x: evt.clientX,
            y: evt.clientY
          });

          state.addNodeFromType(dragAndDrop.type, position);
        }

        dragAndDrop.setType(null);
      } else if (evt.button === 1) {
        if (!isDragging.current) return;

        document.documentElement.style.setProperty("--cursor", "default");
        isDragging.current = false;
        lastPosition.current = null;

        console.log("Saved viewport", flow.getViewport());
        state.setViewport(flow.getViewport());
      }
    }

    window.addEventListener("mousedown", onMouseDown, true);
    window.addEventListener("mousemove", onMouseMove, true);
    window.addEventListener("mouseup", onMouseUp, true);

    return () => {
      window.removeEventListener("mousedown", onMouseDown, true);
      window.removeEventListener("mousemove", onMouseMove, true);
      window.removeEventListener("mouseup", onMouseUp, true);
    };
  }, [flow, screenToFlowPosition, state, dragAndDrop]);

  return <div aria-hidden="true" style={{ display: "none" }}></div>;
}

export default memo(GraphControl);

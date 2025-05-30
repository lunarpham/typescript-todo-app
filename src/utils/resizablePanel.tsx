import { useRef, useState, useCallback, useEffect } from "react";

export interface ResizablePanelConfig {
  initialWidth: number;
  minWidth: number;
  maxWidth: number;
  storageKey?: string;
  onResize?: (width: number) => void;
}

export function useResizablePanel({
  initialWidth,
  minWidth,
  maxWidth,
  storageKey,
  onResize,
}: ResizablePanelConfig) {
  const [width, setWidth] = useState(() => {
    if (typeof window !== "undefined" && storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsedWidth = parseInt(stored, 10);
        return Math.max(minWidth, Math.min(maxWidth, parsedWidth));
      }
    }
    return initialWidth;
  });

  const isResizingRef = useRef(false);
  // Store event handlers in refs to ensure we always remove the correct ones
  const handleMouseMoveRef = useRef<(e: MouseEvent) => void>(() => {});
  const handleRightMouseMoveRef = useRef<(e: MouseEvent) => void>(() => {});
  const handleMouseUpRef = useRef<() => void>(() => {});

  // Update the handler refs when dependencies change
  useEffect(() => {
    handleMouseMoveRef.current = (e: MouseEvent) => {
      if (!isResizingRef.current) return;
      const newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX));
      setWidth(newWidth);
      onResize?.(newWidth);
    };

    handleRightMouseMoveRef.current = (e: MouseEvent) => {
      if (!isResizingRef.current) return;
      const newWidth = Math.max(
        minWidth,
        Math.min(maxWidth, window.innerWidth - e.clientX)
      );
      setWidth(newWidth);
      onResize?.(newWidth);
    };

    handleMouseUpRef.current = () => {
      isResizingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMoveRef.current);
      document.removeEventListener(
        "mousemove",
        handleRightMouseMoveRef.current
      );
      document.removeEventListener("mouseup", handleMouseUpRef.current);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [minWidth, maxWidth, onResize]);

  const handleMouseDown = useCallback(() => {
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMoveRef.current);
    document.addEventListener("mouseup", handleMouseUpRef.current);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const handleRightMouseDown = useCallback(() => {
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleRightMouseMoveRef.current);
    document.addEventListener("mouseup", handleMouseUpRef.current);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  // Save to localStorage when width changes
  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      localStorage.setItem(storageKey, width.toString());
    }
  }, [width, storageKey]);

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMoveRef.current);
      document.removeEventListener(
        "mousemove",
        handleRightMouseMoveRef.current
      );
      document.removeEventListener("mouseup", handleMouseUpRef.current);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, []);

  return {
    width,
    setWidth,
    handleMouseDown,
    handleRightMouseDown,
    ResizeHandle: ({ position = "right" }: { position?: "left" | "right" }) => (
      <div
        className={`absolute top-0 ${
          position === "right" ? "right-0" : "left-0"
        } w-3 h-full cursor-col-resize hover:bg-blue-400 transition-colors z-50`}
        onMouseDown={
          position === "right" ? handleRightMouseDown : handleMouseDown
        }
      />
    ),
  };
}

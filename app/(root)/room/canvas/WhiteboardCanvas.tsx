"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Toolbar from "./Toolbar";

const WhiteboardCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Toolbar state and handlers
  const [selectedTool, setSelectedTool] = useState<string>("Pen");
  // Custom cursor state
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  // Stroke width state
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  // Undo/redo stacks
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const handleToolSelect = (tool: string) => setSelectedTool(tool);

  // Save current canvas state to undo stack
  const saveState = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      setUndoStack((stack) => [...stack, canvas.toDataURL()]);
      setRedoStack([]); // Clear redo stack on new action
    }
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length === 0) return;
    setRedoStack((stack) => [canvas.toDataURL(), ...stack]);
    const prev = undoStack[undoStack.length - 1];
    setUndoStack((stack) => stack.slice(0, -1));
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.src = prev;
    img.onload = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  const handleRedo = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) return;
    setUndoStack((stack) => [...stack, canvas.toDataURL()]);
    const next = redoStack[0];
    setRedoStack((stack) => stack.slice(1));
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.src = next;
    img.onload = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    saveState();
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "whiteboard.png";
    a.click();
  };

  // Resize canvas to fit parent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Drawing handlers
  const getPointer = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ("clientX" in e) {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (selectedTool === "Pen" || selectedTool === "Eraser") {
      saveState();
      setDrawing(true);
      const pt = getPointer(e);
      setLastPoint(pt);
      setPointer(pt);
    }
    // Future: shape, text, image tools here
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const point = getPointer(e);
    setPointer(point);
    if (lastPoint) {
      if (selectedTool === "Pen") {
        ctx.strokeStyle = "#111827";
        ctx.lineWidth = strokeWidth;
      } else if (selectedTool === "Eraser") {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = strokeWidth + 10;
      }
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
    setLastPoint(point);
  };

  const endDraw = () => {
    setDrawing(false);
    setLastPoint(null);
  };

  // Track pointer position for custom cursor
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    setPointer(getPointer(e));
  };

  const handlePointerLeave = () => {
    setPointer(null);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-center py-2">
        <Toolbar
          selectedTool={selectedTool}
          onToolSelect={handleToolSelect}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClear={handleClear}
          onDownload={handleDownload}
        />
      </div>
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full bg-white rounded shadow"
          style={{
            touchAction: "none",
            cursor: "none",
          }}
          onMouseDown={startDraw}
          onMouseMove={(e) => {
            draw(e);
            handlePointerMove(e);
          }}
          onMouseUp={endDraw}
          onMouseLeave={() => {
            endDraw();
            handlePointerLeave();
          }}
          onTouchStart={startDraw}
          onTouchMove={(e) => {
            draw(e);
            handlePointerMove(e);
          }}
          onTouchEnd={endDraw}
          width={800}
          height={600}
        />
        {/* Custom animated cursor */}
        {pointer && (
          <Image
            src={selectedTool === "Eraser" ? "/eraser.svg" : "/finger.svg"}
            alt={selectedTool === "Eraser" ? "eraser-cursor" : "cursor"}
            style={{
              position: "absolute",
              left: pointer.x - 12,
              top: pointer.y - 8,
              pointerEvents: "none",
              transform: drawing ? "scale(1)" : "scale(1)",
              transition: "transform 0.15s cubic-bezier(.4,2,.6,1)",
              zIndex: 10,
              filter: drawing
                ? "drop-shadow(0 2px 6px rgba(0,0,0,0.18))"
                : undefined,
            }}
            draggable={false}
            width={32}
            height={32}
          />
        )}
        {/* Stroke size slider (shown for Pen/Eraser) */}
        {(selectedTool === "Pen" || selectedTool === "Eraser") && (
          <div className="absolute bottom-4 left-4 bg-white/90 rounded-xl shadow-lg px-4 py-2 flex flex-col items-center z-20">
            <label className="text-xs mb-1 font-medium text-gray-700 select-none">
              Stroke size
            </label>
            <input
              type="range"
              min={1}
              max={32}
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-28 accent-green-600"
            />
            <div className="mt-1 flex items-center gap-2">
              <span
                className="block w-4 h-4 rounded-full bg-gray-400"
                style={{ width: 6, height: 6 }}
              />
              <span
                className="block w-4 h-4 rounded-full bg-gray-700"
                style={{
                  width: strokeWidth,
                  height: strokeWidth,
                  background: selectedTool === "Eraser" ? "#fff" : "#111827",
                  border: "1px solid #bbb",
                }}
              />
              <span
                className="block w-4 h-4 rounded-full bg-gray-400"
                style={{ width: 28, height: 28 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhiteboardCanvas;

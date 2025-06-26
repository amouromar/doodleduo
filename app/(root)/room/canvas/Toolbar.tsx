"use client";
import { Pencil, Eraser, Undo2, Redo2, Trash2, Square, Circle, Type, ArrowDownLeft, Download, Image as ImageIcon } from "lucide-react";
import React from "react";

const tools = [
  { name: "Pen", icon: <Pencil size={18} /> },
  { name: "Eraser", icon: <Eraser size={18} /> },
  { name: "Rectangle", icon: <Square size={18} /> },
  { name: "Circle", icon: <Circle size={18} /> },
  { name: "Line", icon: <ArrowDownLeft size={18} /> },
  { name: "Text", icon: <Type size={18} /> },
  { name: "Image", icon: <ImageIcon size={18} /> },
];

const Toolbar: React.FC<{
  onToolSelect?: (tool: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onClear?: () => void;
  onDownload?: () => void;
  selectedTool?: string;
}> = ({ onToolSelect, onUndo, onRedo, onClear, onDownload, selectedTool }) => {
  return (
    <div className="flex flex-row gap-2 bg-white rounded shadow-2xl px-1 py-2 items-center select-none">
      {tools.map((tool) => (
        <button
          key={tool.name}
          className={`p-2 rounded-full hover:bg-gray-100 transition ${selectedTool === tool.name ? "bg-green-200" : ""}`}
          onClick={() => onToolSelect && onToolSelect(tool.name)}
          title={tool.name}
        >
          {tool.icon}
        </button>
      ))}
      <span className="mx-3.5 border-l h-6 border-gray-300"></span>
      <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={onUndo} title="Undo">
        <Undo2 size={18} />
      </button>
      <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={onRedo} title="Redo">
        <Redo2 size={18} />
      </button>
      <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={onClear} title="Clear">
        <Trash2 size={18} />
      </button>
      <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={onDownload} title="Download">
        <Download size={18} />
      </button>
      {/* Add color picker, stroke size, etc. here as needed */}
    </div>
  );
};

export default Toolbar;

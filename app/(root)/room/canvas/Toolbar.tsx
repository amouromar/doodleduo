"use client";
import {
  Pencil,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Square,
  Circle,
  Type,
  ArrowDownLeft,
  Download,
  Image as ImageIcon,
} from "lucide-react";
import React from "react";

const Toolbar: React.FC<{
  onToolSelect?: (tool: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onClear?: () => void;
  onDownload?: () => void;
  selectedTool?: string;
}> = ({ onToolSelect, onUndo, onRedo, onClear, onDownload, selectedTool }) => {
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconSize = windowWidth < 640 ? 14 : 18;

  const tools = [
    { name: "Pen", icon: <Pencil size={iconSize} /> },
    { name: "Eraser", icon: <Eraser size={iconSize} /> },
    { name: "Rectangle", icon: <Square size={iconSize} /> },
    { name: "Circle", icon: <Circle size={iconSize} /> },
    { name: "Line", icon: <ArrowDownLeft size={iconSize} /> },
    { name: "Text", icon: <Type size={iconSize} /> },
    { name: "Image", icon: <ImageIcon size={iconSize} /> },
  ];
  return (
    <div className="flex flex-row gap-1 bg-white rounded shadow-2xl px-1 py-2 items-center select-none">
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
      <button
        className="p-1.5 rounded-full hover:bg-gray-100"
        onClick={onUndo}
        title="Undo"
      >
        <Undo2 size={iconSize} />
      </button>
      <button
        className="p-1.5 rounded-full hover:bg-gray-100"
        onClick={onRedo}
        title="Redo"
      >
        <Redo2 size={iconSize} />
      </button>
      <button
        className="p-1.5 rounded-full hover:bg-gray-100"
        onClick={onClear}
        title="Clear"
      >
        <Trash2 size={iconSize} />
      </button>
      <button
        className="p-1.5 rounded-full hover:bg-gray-100"
        onClick={onDownload}
        title="Download"
      >
        <Download size={iconSize} />
      </button>
    </div>
  );
};

export default Toolbar;

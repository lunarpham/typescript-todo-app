import { useState, useRef } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Filter from "../components/Filter";

export default function Sidebar() {
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const sidebarRef = useRef(false);

  const handleMouseDown = () => {
    sidebarRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!sidebarRef.current) return;
    const newWidth = Math.max(250, Math.min(500, e.clientX));
    setSidebarWidth(newWidth);
  };

  const handleMouseUp = () => {
    sidebarRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="min-h-screen p-6 border-r border-gray-300 space-y-4 relative"
      style={{ width: `${sidebarWidth}px` }}
    >
      <Header />
      <Search />
      <Filter />

      {/* Resize handle */}
      <div
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-400 transition-colors"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

import { useState } from "react";
import { useTodoContext } from "~/contexts/todoContext";
import { List, Grid2x2, Trash, Check, Pencil } from "lucide-react";
import ListView from "~/components/ListView";
import CardView from "~/components/CardView";

export default function TodoList() {
  const { todos } = useTodoContext();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  return (
    <div className="w-full p-6 space-y-4 transition-all duration-300">
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">Upcoming</h1>
        <div className="flex gap-0">
          <button
            onClick={() => setViewMode("list")}
            className={`w-10 h-10 rounded-l-md p-2 inline-flex justify-center items-center ${
              viewMode === "list" ? "bg-black/20" : "bg-black/10"
            }`}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`w-10 h-10 rounded-r-md p-2 inline-flex justify-center items-center ${
              viewMode === "grid" ? "bg-black/20" : "bg-black/10"
            }`}
          >
            <Grid2x2 size={20} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {viewMode === "grid" ? <CardView /> : <ListView />}
      </div>
    </div>
  );
}

import { List, Grid2x2, ArrowUpDown } from "lucide-react";
import ListView from "src/components/ListView";
import CardView from "src/components/CardView";
import { useTodoContext } from "src/contexts/todoContext";

export default function TodoList() {
  const {
    filteredAndSortedTodos,
    filters,
    setSortDirection,
    viewMode,
    setViewMode,
  } = useTodoContext();

  const handleSortToggle = () => {
    setSortDirection(filters.sortDirection === "asc" ? "desc" : "asc");
  };

  const getFilterTitle = () => {
    switch (filters.status) {
      case "pending":
        return "Upcoming";
      case "completed":
        return "Completed";
      default:
        return "All Tasks";
    }
  };

  return (
    <div className="w-full p-6 space-y-4 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-3xl">{getFilterTitle()}</h1>
          <span className="text-lg text-gray-500">
            ({filteredAndSortedTodos.length})
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSortToggle}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
            title={`Sort by due date (${
              filters.sortDirection === "asc"
                ? "earliest first"
                : "latest first"
            })`}
          >
            <ArrowUpDown size={16} />
            <span className="text-sm">
              Due Date ({filters.sortDirection === "asc" ? "↑" : "↓"})
            </span>
          </button>
          <div className="flex gap-0">
            <button
              onClick={() => setViewMode("list")}
              className={`w-10 h-10 rounded-l-md p-2 inline-flex justify-center items-center cursor-pointer ${
                viewMode === "list" ? "bg-black/20" : "bg-black/10"
              }`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`w-10 h-10 rounded-r-md p-2 inline-flex justify-center items-center cursor-pointer ${
                viewMode === "grid" ? "bg-black/20" : "bg-black/10"
              }`}
            >
              <Grid2x2 size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {viewMode === "grid" ? <CardView /> : <ListView />}
      </div>
    </div>
  );
}

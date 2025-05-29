import { useTodoContext } from "~/contexts/todoContext";
import { List, Grid2x2, Plus, ArrowUpDown } from "lucide-react";
import ListView from "~/components/ListView";
import CardView from "~/components/CardView";

export default function TodoList() {
  const { state, actions, filteredAndSortedTodos } = useTodoContext();

  const handleSortToggle = () => {
    const newOrder = state.filters.sortOrder === "asc" ? "desc" : "asc";
    actions.setSort(state.filters.sortBy, newOrder);
  };

  const getFilterTitle = () => {
    switch (state.filters.selectedFilter) {
      case "upcoming":
        return "Upcoming";
      case "archived":
        return "Archived";
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
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-black/10 hover:bg-black/20 transition-colors"
            title={`Sort by ${state.filters.sortBy} (${state.filters.sortOrder})`}
          >
            <ArrowUpDown size={16} />
            <span className="text-sm">
              {state.filters.sortBy === "dueDate"
                ? "Due"
                : state.filters.sortBy === "createdAt"
                ? "Created"
                : "Title"}
            </span>
          </button>
          <div className="flex gap-0">
            <button
              onClick={() => actions.setViewMode("list")}
              className={`w-10 h-10 rounded-l-md p-2 inline-flex justify-center items-center ${
                state.ui.viewMode === "list" ? "bg-black/20" : "bg-black/10"
              }`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => actions.setViewMode("grid")}
              className={`w-10 h-10 rounded-r-md p-2 inline-flex justify-center items-center ${
                state.ui.viewMode === "grid" ? "bg-black/20" : "bg-black/10"
              }`}
            >
              <Grid2x2 size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {state.ui.viewMode === "grid" ? <CardView /> : <ListView />}
      </div>
    </div>
  );
}

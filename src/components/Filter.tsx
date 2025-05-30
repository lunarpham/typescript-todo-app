import { CalendarDays, Archive, Check } from "lucide-react";
import { categoryColors, Category } from "src/types/todoTypes";
import { useTodoContext } from "src/contexts/todoContext";

export default function Filter() {
  const { filters, toggleType, selectAllTypes, setStatus, todos } =
    useTodoContext();

  const handleTypeChange = (type: Category) => {
    // Toggle category selection
    toggleType(type);
  };

  const handleShowAllTypes = () => {
    selectAllTypes();
  };

  const handleFilterChange = (filter: "all" | "completed" | "pending") => {
    setStatus(filter);
  };

  const handleShowAllTasks = () => {
    setStatus("all");
  };

  // Calculate counts for each filter
  const getCounts = () => {
    const pending = todos.filter((todo) => !todo.completed).length;
    const completed = todos.filter((todo) => todo.completed).length;
    return { pending, completed, all: todos.length };
  };

  const counts = getCounts();

  // Check if all categories are selected
  const allTypesSelected =
    filters.selectedTypes.length === Object.values(Category).length;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="uppercase text-sm font-semibold">Tasks</h3>
          <button
            className="text-sm text-black/50 cursor-pointer hover:text-black"
            onClick={handleShowAllTasks}
          >
            Show All
          </button>
        </div>
        <div className="space-y-2">
          <div
            className={`p-2 rounded-md flex justify-between items-center hover:bg-black/10 cursor-pointer ${
              filters.status === "pending" ? "bg-black/10" : ""
            }`}
            onClick={() => handleFilterChange("pending")}
          >
            <div className="space-x-2 items-center flex">
              <CalendarDays size={16} />
              <div className="font-semibold text-sm">Upcoming</div>
            </div>
            <span className="text-sm font-semibold px-2 rounded-full bg-neutral-200">
              {counts.pending}
            </span>
          </div>

          <div
            className={`p-2 rounded-md flex justify-between items-center hover:bg-black/10 cursor-pointer ${
              filters.status === "completed" ? "bg-black/10" : ""
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            <div className="space-x-2 items-center flex">
              <Archive size={16} />
              <div className="text-sm">Archived</div>
            </div>
            <span className="text-sm font-semibold px-2 rounded-full bg-neutral-200">
              {counts.completed}
            </span>
          </div>

          <div
            className={`p-2 rounded-md flex justify-between items-center hover:bg-black/10 cursor-pointer ${
              filters.status === "all" ? "bg-black/10" : ""
            }`}
            onClick={() => handleFilterChange("all")}
          >
            <div className="space-x-2 items-center flex">
              <Check size={16} />
              <div className="text-sm">All Tasks</div>
            </div>
            <span className="text-sm font-semibold px-2 rounded-full bg-neutral-200">
              {counts.all}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="uppercase text-sm font-semibold">Types</h3>
            <button
              className="text-sm text-black/50 cursor-pointer hover:text-black"
              onClick={handleShowAllTypes}
            >
              Show All
            </button>
          </div>
          <div className="space-y-1">
            {Object.entries(categoryColors).map(([key, color]) => {
              const category = key as Category;
              return (
                <div
                  key={key}
                  className={`p-2 rounded-md flex justify-between items-center hover:bg-black/10 cursor-pointer`}
                  onClick={() => handleTypeChange(category)}
                >
                  <div className="space-x-2 items-center flex">
                    <div className={`h-4 w-4 rounded-sm ${color}`}></div>
                    <div className="text-sm">{key}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {filters.selectedTypes.includes(category) && (
                      <Check size={16} className="text-blue-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

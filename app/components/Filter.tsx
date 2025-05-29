import { useState } from "react";
import { CalendarDays, Archive, Check } from "lucide-react";
import { categoryColors, Category } from "~/types/todoTypes";
import { useTodoContext } from "~/contexts/todoContext";

export default function Filter() {
  const { state, actions, filteredAndSortedTodos } = useTodoContext();
  const { filters } = state;

  const handleTypeChange = (type: Category) => {
    let newSelectedTypes: Category[];
    if (filters.selectedTypes.includes(type)) {
      newSelectedTypes = filters.selectedTypes.filter((t) => t !== type);
    } else {
      newSelectedTypes = [...filters.selectedTypes, type];
    }
    actions.setSelectedTypes(newSelectedTypes);
  };

  const handleShowAllTypes = () => {
    actions.setSelectedTypes(Object.values(Category));
  };

  const handleFilterChange = (filter: "all" | "upcoming" | "archived") => {
    actions.setFilter(filter);
  };

  const handleShowAllTasks = () => {
    actions.setFilter("all");
  };

  // Calculate counts for each filter
  const getCounts = () => {
    const upcoming = state.todos.filter((todo) => !todo.completed).length;
    const archived = state.todos.filter((todo) => todo.completed).length;
    return { upcoming, archived, all: state.todos.length };
  };

  const counts = getCounts();

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
              filters.selectedFilter === "upcoming" ? "bg-black/10" : ""
            }`}
            onClick={() => handleFilterChange("upcoming")}
          >
            <div className="space-x-2 items-center flex">
              <CalendarDays size={16} />
              <div className="font-semibold text-sm">Upcoming</div>
            </div>
            <span className="text-sm font-semibold px-2 rounded-full bg-neutral-200">
              {counts.upcoming}
            </span>
          </div>

          <div
            className={`p-2 rounded-md flex justify-between items-center hover:bg-black/10 cursor-pointer ${
              filters.selectedFilter === "archived" ? "bg-black/10" : ""
            }`}
            onClick={() => handleFilterChange("archived")}
          >
            <div className="space-x-2 items-center flex">
              <Archive size={16} />
              <div className="text-sm">Archived</div>
            </div>
            <span className="text-sm font-semibold px-2 rounded-full bg-neutral-200">
              {counts.archived}
            </span>
          </div>

          <div
            className={`p-2 rounded-md flex justify-between items-center hover:bg-black/10 cursor-pointer ${
              filters.selectedFilter === "all" ? "bg-black/10" : ""
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
              const categoryCount = state.todos.filter(
                (todo) => todo.category === key
              ).length;
              return (
                <div
                  key={key}
                  className={`p-2 rounded-md flex justify-between items-center hover:bg-black/10 cursor-pointer`}
                  onClick={() => handleTypeChange(key as Category)}
                >
                  <div className="space-x-2 items-center flex">
                    <div className={`h-4 w-4 rounded-sm ${color}`}></div>
                    <div className="text-sm">{key}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold px-2 rounded-full bg-neutral-200">
                      {categoryCount}
                    </span>
                    {filters.selectedTypes.includes(key as Category) ? (
                      <Check size={16} className="text-blue-500" />
                    ) : null}
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

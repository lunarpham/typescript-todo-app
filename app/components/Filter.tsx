import { useState } from "react";
import { CalendarDays, Archive, Check } from "lucide-react";
import { categoryColors, Category } from "~/types/todoTypes";

type FilterProps = {
  selectedTypes?: Category[];
  onTypeChange?: (types: Category[]) => void;
  selectedFilter?: "all" | "upcoming" | "archived";
  onFilterChange?: (filter: "all" | "upcoming" | "archived") => void;
};

export default function Filter({
  selectedTypes = Object.keys(categoryColors) as Category[],
  onTypeChange,
  selectedFilter = "upcoming",
  onFilterChange,
}: FilterProps = {}) {
  const [initialSelectedTypes, setInitialSelectedTypes] =
    useState<Category[]>(selectedTypes);

  const [initialSelectedFilter, setInitialSelectedFilter] =
    useState(selectedFilter);

  const handleTypeChange = (type: Category) => {
    let newSelectedTypes: Category[];
    if (initialSelectedTypes.includes(type)) {
      newSelectedTypes = initialSelectedTypes.filter((t) => t !== type);
    } else {
      newSelectedTypes = [...initialSelectedTypes, type];
    }
    setInitialSelectedTypes(newSelectedTypes);
    onTypeChange?.(newSelectedTypes);
  };

  const handleShowAllTypes = () => {
    setInitialSelectedTypes(Object.keys(categoryColors) as Category[]);
    onTypeChange?.(Object.keys(categoryColors) as Category[]);
  };

  const handleFilterChange = (filter: "all" | "upcoming" | "archived") => {
    setInitialSelectedFilter(filter);
    onFilterChange?.(filter);
  };

  const handleShowAllTasks = () => {
    handleFilterChange("all");
  };

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
              initialSelectedFilter === "upcoming" ? "bg-black/10" : ""
            }`}
            onClick={() => handleFilterChange("upcoming")}
          >
            <div className="space-x-2 items-center flex">
              <CalendarDays size={16} />
              <div className="font-semibold text-sm">Upcoming</div>
            </div>
            <span className="text-sm font-semibold px-2 rounded-full bg-neutral-200">
              12
            </span>
          </div>
          <div
            className={`p-2 rounded-md flex justify-between items-center hover:bg-black/10 cursor-pointer ${
              initialSelectedFilter === "archived" ? "bg-black/10" : ""
            }`}
            onClick={() => handleFilterChange("archived")}
          >
            <div className="space-x-2 items-center flex">
              <Archive size={16} />
              <div className="text-sm">Archived</div>
            </div>
            <span className="text-sm font-semibold px-2 rounded-full bg-neutral-200">
              14
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
            {Object.entries(categoryColors).map(([key, color]) => (
              <div
                key={key}
                className={`p-2 rounded-md flex justify-between items-center hover:bg-black/10 cursor-pointer `}
                onClick={() => handleTypeChange(key as Category)}
              >
                <div className="space-x-2 items-center flex">
                  <div className={`h-4 w-4 rounded-sm ${color}`}></div>
                  <div className="text-sm">{key}</div>
                </div>
                <div className="flex items-center gap-2">
                  {initialSelectedTypes.includes(key as Category) ? (
                    <Check size={16} className="text-blue-500" />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { TodoAttributes, Category } from "src/types/todoTypes";

export type FilterOption = "all" | "completed" | "pending";
export type SortOption = "dueDate"; // Only due date sorting

export function useFilters(todos: TodoAttributes[]) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FilterOption>("pending");
  const [selectedTypes, setSelectedTypes] = useState<Category[]>(
    Object.values(Category)
  );
  const [sort, setSort] = useState<SortOption>("dueDate"); // Always dueDate
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const resetFilters = () => {
    setSearch("");
    setStatus("all");
    setSelectedTypes(Object.values(Category));
    setSort("dueDate");
    setSortDirection("asc");
  };

  const toggleType = (type: Category) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        const newTypes = prev.filter((t) => t !== type);
        return newTypes.length === 0 ? Object.values(Category) : newTypes;
      } else {
        return [...prev, type];
      }
    });
  };

  const selectAllTypes = () => {
    setSelectedTypes(Object.values(Category));
  };

  const filteredAndSortedTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        if (
          search &&
          !todo.title.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }

        if (status === "completed" && !todo.completed) return false;
        if (status === "pending" && todo.completed) return false;

        if (selectedTypes.length < Object.values(Category).length) {
          return todo.category && selectedTypes.includes(todo.category);
        }

        return true;
      })
      .sort((a, b) => {
        // Only sort by due date
        let comparison = 0;

        // Handle null due dates - todos without due dates go to the end
        if (!a.dueDate && !b.dueDate) comparison = 0;
        else if (!a.dueDate) comparison = 1;
        else if (!b.dueDate) comparison = -1;
        else
          comparison =
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();

        return sortDirection === "asc" ? comparison : -comparison;
      });
  }, [todos, search, status, selectedTypes, sortDirection]); // Removed sort dependency since it's always dueDate

  return {
    filters: {
      search,
      status,
      selectedTypes,
      sort,
      sortDirection,
    },
    setSearch,
    setStatus,
    toggleType,
    selectAllTypes,
    setSort, // Keep for interface compatibility but won't change from dueDate
    setSortDirection,
    resetFilters,
    filteredAndSortedTodos,
  };
}

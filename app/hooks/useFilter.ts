import { useState, useMemo } from "react";
import { TodoAttributes, Category } from "~/types/todoTypes";

export type FilterType = "all" | "upcoming" | "archived";

export interface FilterState {
  selectedTypes: Category[];
  selectedFilter: FilterType;
  searchTerm: string;
}

export function useFilter(todos: TodoAttributes[]) {
  const [selectedTypes, setSelectedTypes] = useState<Category[]>(
    Object.values(Category)
  );
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("upcoming");

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredTodos = useMemo(() => {
    let result = todos;

    // Search filter
    if (searchTerm.trim()) {
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedTypes.length > 0) {
      result = result.filter(
        (todo) => todo.category && selectedTypes.includes(todo.category)
      );
    }

    // Status filter
    if (selectedFilter === "upcoming") {
      result = result.filter((todo) => !todo.completed);
    } else if (selectedFilter === "archived") {
      result = result.filter((todo) => todo.completed);
    }

    return result;
  }, [todos, searchTerm, selectedTypes, selectedFilter]);

  return {
    selectedTypes,
    setSelectedTypes,
    selectedFilter,
    setSelectedFilter,
    searchTerm,
    setSearchTerm,
    filteredTodos,
  };
}

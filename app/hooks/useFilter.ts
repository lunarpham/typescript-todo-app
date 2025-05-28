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
    let filteredTodos = todos;

    // If there is search term, filter todos by title or description
    if (searchTerm.trim()) {
      filteredTodos = filteredTodos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by selected types
  }, []);
}

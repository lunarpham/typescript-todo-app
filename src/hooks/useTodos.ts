import { useMemo } from "react";
import { TodoAttributes, Category } from "src/types/todoTypes";
import { useLocalStorage } from "./useLocalStorage";
import { useTodoReducer } from "src/contexts/appReducer";

export type FilterType = "all" | "upcoming" | "archived";
export type SortType = "dueDate" | "createdAt" | "title";
export type SortOrder = "asc" | "desc";

export interface TodoFilters {
  searchTerm: string;
  selectedTypes: Category[];
  selectedFilter: FilterType;
  sortBy: SortType;
  sortOrder: SortOrder;
}

const initialTodos: TodoAttributes[] = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Finish the Q2 project proposal with detailed timeline",
    completed: false,
    category: Category.WORK,
    createdAt: new Date("2024-01-15"),
    dueDate: new Date("2024-02-01"),
  },
  {
    id: 2,
    title: "Buy groceries",
    description: "Get ingredients for weekend dinner party",
    completed: true,
    category: Category.PERSONAL,
    createdAt: new Date("2024-01-16"),
    dueDate: new Date("2024-01-20"),
  },
  {
    id: 3,
    title: "Study for exam",
    description: "Review chapters 5-8 for the upcoming test",
    completed: false,
    category: Category.SCHOOL,
    createdAt: new Date("2024-01-17"),
    dueDate: new Date("2024-01-25"),
  },
];

export function useTodos() {
  const [storedTodos, setStoredTodos] = useLocalStorage<TodoAttributes[]>(
    "todos",
    initialTodos
  );

  const { state, dispatch } = useTodoReducer(storedTodos);

  // Sync with localStorage when todos change
  const syncToLocalStorage = (todos: TodoAttributes[]) => {
    setStoredTodos(todos);
  };

  const addTodo = (todo: Omit<TodoAttributes, "id" | "createdAt">) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const newTodo: TodoAttributes = {
        ...todo,
        id: Date.now(),
        createdAt: new Date(),
      };

      dispatch({ type: "ADD_TODO_SUCCESS", payload: newTodo });
      const updatedTodos = [...state.todos, newTodo];
      syncToLocalStorage(updatedTodos);
    } catch (error: any) {
      dispatch({
        type: "ADD_TODO_ERROR",
        payload: error.message || "Failed to add todo",
      });
    }
  };

  const updateTodo = (id: number, updates: Partial<TodoAttributes>) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // Check if todo exists
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (!existingTodo) {
        dispatch({
          type: "UPDATE_TODO_ERROR",
          payload: { id, error: "Todo not found" },
        });
        return;
      }

      dispatch({ type: "UPDATE_TODO_SUCCESS", payload: { id, updates } });
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      );
      syncToLocalStorage(updatedTodos);
    } catch (error: any) {
      dispatch({
        type: "UPDATE_TODO_ERROR",
        payload: { id, error: error.message || "Failed to update todo" },
      });
    }
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // Check if todo exists
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (!existingTodo) {
        dispatch({
          type: "DELETE_TODO_ERROR",
          payload: { id, error: "Todo not found" },
        });
        return;
      }

      dispatch({ type: "DELETE_TODO_SUCCESS", payload: id });
      const filteredTodos = state.todos.filter((todo) => todo.id !== id);
      syncToLocalStorage(filteredTodos);
    } catch (error: any) {
      dispatch({
        type: "DELETE_TODO_ERROR",
        payload: { id, error: error.message || "Failed to delete todo" },
      });
    }
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (!existingTodo) {
        dispatch({
          type: "UPDATE_TODO_ERROR",
          payload: { id, error: "Todo not found" },
        });
        return;
      }

      dispatch({ type: "TOGGLE_TODO_SUCCESS", payload: id });
      const toggledTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      syncToLocalStorage(toggledTodos);
    } catch (error: any) {
      dispatch({
        type: "UPDATE_TODO_ERROR",
        payload: { id, error: error.message || "Failed to toggle todo" },
      });
    }
  };

  const clearError = () => {
    dispatch({ type: "SET_ERROR", payload: null });
  };

  return {
    todos: state.todos,
    loading: state.loading,
    error: state.error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError,
  };
}

export function useFilteredTodos(
  todos: TodoAttributes[],
  filters: TodoFilters
) {
  return useMemo(() => {
    let result = [...todos];

    // Apply search filter
    if (filters.searchTerm.trim()) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (
      filters.selectedTypes.length > 0 &&
      filters.selectedTypes.length < Object.values(Category).length
    ) {
      result = result.filter(
        (todo) => todo.category && filters.selectedTypes.includes(todo.category)
      );
    }

    // Apply status filter
    if (filters.selectedFilter === "upcoming") {
      result = result.filter((todo) => !todo.completed);
    } else if (filters.selectedFilter === "archived") {
      result = result.filter((todo) => todo.completed);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case "dueDate":
          const aDate = a.dueDate ? a.dueDate.getTime() : Infinity;
          const bDate = b.dueDate ? b.dueDate.getTime() : Infinity;
          comparison = aDate - bDate;
          break;
        case "createdAt":
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [todos, filters]);
}

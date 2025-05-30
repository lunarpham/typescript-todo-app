import { createContext, useContext, ReactNode } from "react";
import { TodoAttributes, Category } from "src/types/todoTypes";
import { useTodos } from "src/hooks/useTodos";
import { useUIState, ViewMode, FormMode } from "src/hooks/useUIState";
import { useFilters, FilterOption, SortOption } from "src/hooks/useFilters";

export interface TodoContextType {
  // Todo operations
  todos: TodoAttributes[];
  loading: boolean;
  error: string | null;
  addTodo: (todo: Omit<TodoAttributes, "id" | "createdAt">) => void;
  updateTodo: (id: number, updates: Partial<TodoAttributes>) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  clearError: () => void;

  // Filtered todos
  filteredAndSortedTodos: TodoAttributes[];

  // UI state
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Form state
  formState: {
    mode: FormMode;
    currentTodo: TodoAttributes | null;
    isVisible: boolean;
  };
  openAddForm: () => void;
  openEditForm: (todo: TodoAttributes) => void;
  openViewForm: (todo: TodoAttributes) => void;
  closeForm: () => void;

  filters: {
    search: string;
    status: FilterOption;
    selectedTypes: Category[];
    sort: SortOption;
    sortDirection: "asc" | "desc";
  };
  setSearch: (search: string) => void;
  setStatus: (status: FilterOption) => void;
  toggleType: (type: Category) => void;
  selectAllTypes: () => void;
  setSort: (sort: SortOption) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
  resetFilters: () => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError,
  } = useTodos();

  const {
    viewMode,
    setViewMode,
    formState,
    openAddForm,
    openEditForm,
    openViewForm,
    closeForm,
  } = useUIState();

  const {
    filters,
    setSearch,
    setStatus,
    toggleType,
    selectAllTypes,
    setSort,
    setSortDirection,
    resetFilters,
    filteredAndSortedTodos,
  } = useFilters(todos);

  const contextValue: TodoContextType = {
    // Todo operations
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError,

    // Filtered todos
    filteredAndSortedTodos,

    // UI state
    viewMode,
    setViewMode,

    // Form state
    formState,
    openAddForm,
    openEditForm,
    openViewForm,
    closeForm,

    // Filters
    filters,
    setSearch,
    setStatus,
    toggleType,
    selectAllTypes,
    setSort,
    setSortDirection,
    resetFilters,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}

export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
}

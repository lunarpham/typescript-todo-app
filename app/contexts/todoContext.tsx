import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import { TodoAttributes, Category } from "~/types/todoTypes";
import {
  appReducer,
  initialState,
  AppState,
  AppAction,
  FormMode,
  ViewMode,
  FilterType,
  SortType,
  SortOrder,
} from "./appReducer";

export interface TodoContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  filteredAndSortedTodos: TodoAttributes[];
  actions: {
    addTodo: (todo: Omit<TodoAttributes, "id" | "createdAt">) => void;
    updateTodo: (id: number, updates: Partial<TodoAttributes>) => void;
    deleteTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    openAddForm: () => void;
    openEditForm: (todo: TodoAttributes) => void;
    openViewForm: (todo: TodoAttributes) => void;
    closeForm: () => void;
    setSearchTerm: (term: string) => void;
    setSelectedTypes: (types: Category[]) => void;
    setFilter: (filter: FilterType) => void;
    setSort: (sortBy: SortType, sortOrder: SortOrder) => void;
    setViewMode: (mode: ViewMode) => void;
    setSidebarWidth: (width: number) => void;
  };
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const filteredAndSortedTodos = useMemo(() => {
    let result = [...state.todos];

    // Apply search filter
    if (state.filters.searchTerm.trim()) {
      const searchLower = state.filters.searchTerm.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (
      state.filters.selectedTypes.length > 0 &&
      state.filters.selectedTypes.length < Object.values(Category).length
    ) {
      result = result.filter(
        (todo) =>
          todo.category && state.filters.selectedTypes.includes(todo.category)
      );
    }

    // Apply status filter
    if (state.filters.selectedFilter === "upcoming") {
      result = result.filter((todo) => !todo.completed);
    } else if (state.filters.selectedFilter === "archived") {
      result = result.filter((todo) => todo.completed);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (state.filters.sortBy) {
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

      return state.filters.sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [state.todos, state.filters]);

  const actions = {
    addTodo: (todo: Omit<TodoAttributes, "id" | "createdAt">) =>
      dispatch({ type: "ADD_TODO", payload: todo }),

    updateTodo: (id: number, updates: Partial<TodoAttributes>) =>
      dispatch({ type: "UPDATE_TODO", payload: { id, updates } }),

    deleteTodo: (id: number) => dispatch({ type: "DELETE_TODO", payload: id }),

    toggleTodo: (id: number) => dispatch({ type: "TOGGLE_TODO", payload: id }),

    openAddForm: () =>
      dispatch({ type: "SET_FORM_MODE", payload: { mode: "add" } }),

    openEditForm: (todo: TodoAttributes) =>
      dispatch({ type: "SET_FORM_MODE", payload: { mode: "edit", todo } }),

    openViewForm: (todo: TodoAttributes) =>
      dispatch({ type: "SET_FORM_MODE", payload: { mode: "view", todo } }),

    closeForm: () => dispatch({ type: "CLOSE_FORM" }),

    setSearchTerm: (term: string) =>
      dispatch({ type: "SET_SEARCH_TERM", payload: term }),

    setSelectedTypes: (types: Category[]) =>
      dispatch({ type: "SET_SELECTED_TYPES", payload: types }),

    setFilter: (filter: FilterType) =>
      dispatch({ type: "SET_FILTER", payload: filter }),

    setSort: (sortBy: SortType, sortOrder: SortOrder) =>
      dispatch({ type: "SET_SORT", payload: { sortBy, sortOrder } }),

    setViewMode: (mode: ViewMode) =>
      dispatch({ type: "SET_VIEW_MODE", payload: mode }),

    setSidebarWidth: (width: number) =>
      dispatch({ type: "SET_SIDEBAR_WIDTH", payload: width }),
  };

  const contextValue: TodoContextType = {
    state,
    dispatch,
    filteredAndSortedTodos,
    actions,
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

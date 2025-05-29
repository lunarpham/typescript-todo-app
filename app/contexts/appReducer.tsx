import { TodoAttributes, Category } from "~/types/todoTypes";

export type ViewMode = "grid" | "list";
export type FilterType = "all" | "upcoming" | "archived";
export type SortType = "dueDate" | "createdAt" | "title";
export type SortOrder = "asc" | "desc";
export type FormMode = "add" | "edit" | "view" | "closed";

export interface AppState {
  todos: TodoAttributes[];
  formState: {
    mode: FormMode;
    currentTodo: TodoAttributes | null;
    isVisible: boolean;
  };
  filters: {
    searchTerm: string;
    selectedTypes: Category[];
    selectedFilter: FilterType;
    sortBy: SortType;
    sortOrder: SortOrder;
  };
  ui: {
    viewMode: ViewMode;
    sidebarWidth: number;
  };
}

export type AppAction =
  | { type: "ADD_TODO"; payload: Omit<TodoAttributes, "id" | "createdAt"> }
  | {
      type: "UPDATE_TODO";
      payload: { id: number; updates: Partial<TodoAttributes> };
    }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "TOGGLE_TODO"; payload: number }
  | {
      type: "SET_FORM_MODE";
      payload: { mode: FormMode; todo?: TodoAttributes | null };
    }
  | { type: "CLOSE_FORM" }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_SELECTED_TYPES"; payload: Category[] }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "SET_SORT"; payload: { sortBy: SortType; sortOrder: SortOrder } }
  | { type: "SET_VIEW_MODE"; payload: ViewMode }
  | { type: "SET_SIDEBAR_WIDTH"; payload: number };

const initialState: AppState = {
  todos: [
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
  ],
  formState: {
    mode: "closed",
    currentTodo: null,
    isVisible: false,
  },
  filters: {
    searchTerm: "",
    selectedTypes: Object.values(Category),
    selectedFilter: "upcoming",
    sortBy: "dueDate",
    sortOrder: "asc",
  },
  ui: {
    viewMode: "list",
    sidebarWidth: 320,
  },
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            ...action.payload,
            id: Date.now(),
            createdAt: new Date(),
          },
        ],
        formState: {
          mode: "closed",
          currentTodo: null,
          isVisible: false,
        },
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates }
            : todo
        ),
        formState: {
          mode: "closed",
          currentTodo: null,
          isVisible: false,
        },
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        formState: {
          mode: "closed",
          currentTodo: null,
          isVisible: false,
        },
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "SET_FORM_MODE":
      return {
        ...state,
        formState: {
          mode: action.payload.mode,
          currentTodo: action.payload.todo || null,
          isVisible: action.payload.mode !== "closed",
        },
      };

    case "CLOSE_FORM":
      return {
        ...state,
        formState: {
          mode: "closed",
          currentTodo: null,
          isVisible: false,
        },
      };

    case "SET_SEARCH_TERM":
      return {
        ...state,
        filters: {
          ...state.filters,
          searchTerm: action.payload,
        },
      };

    case "SET_SELECTED_TYPES":
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedTypes: action.payload,
        },
      };

    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          selectedFilter: action.payload,
        },
      };

    case "SET_SORT":
      return {
        ...state,
        filters: {
          ...state.filters,
          sortBy: action.payload.sortBy,
          sortOrder: action.payload.sortOrder,
        },
      };

    case "SET_VIEW_MODE":
      return {
        ...state,
        ui: {
          ...state.ui,
          viewMode: action.payload,
        },
      };

    case "SET_SIDEBAR_WIDTH":
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarWidth: action.payload,
        },
      };

    default:
      return state;
  }
}

export { initialState };

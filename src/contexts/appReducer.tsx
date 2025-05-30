import { useReducer } from "react";
import { TodoAttributes } from "src/types/todoTypes";

export type TodoState = {
  todos: TodoAttributes[];
  loading: boolean;
  error: string | null;
};

export type TodoAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_TODOS"; payload: TodoAttributes[] }
  | { type: "ADD_TODO_SUCCESS"; payload: TodoAttributes }
  | {
      type: "UPDATE_TODO_SUCCESS";
      payload: { id: number; updates: Partial<TodoAttributes> };
    }
  | { type: "DELETE_TODO_SUCCESS"; payload: number }
  | { type: "TOGGLE_TODO_SUCCESS"; payload: number }
  | { type: "ADD_TODO_ERROR"; payload: string }
  | { type: "UPDATE_TODO_ERROR"; payload: { id: number; error: string } }
  | { type: "DELETE_TODO_ERROR"; payload: { id: number; error: string } };

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_TODOS":
      return { ...state, todos: action.payload, loading: false, error: null };

    case "ADD_TODO_SUCCESS":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
        error: null,
      };

    case "UPDATE_TODO_SUCCESS": {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.updates }
          : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        loading: false,
        error: null,
      };
    }

    case "DELETE_TODO_SUCCESS":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        loading: false,
        error: null,
      };

    case "TOGGLE_TODO_SUCCESS": {
      const toggledTodos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return {
        ...state,
        todos: toggledTodos,
        loading: false,
        error: null,
      };
    }

    case "ADD_TODO_ERROR":
      return {
        ...state,
        loading: false,
        error: `Failed to add todo: ${action.payload}`,
      };

    case "UPDATE_TODO_ERROR":
      return {
        ...state,
        loading: false,
        error: `Failed to update todo: ${action.payload.error}`,
      };

    case "DELETE_TODO_ERROR":
      return {
        ...state,
        loading: false,
        error: `Failed to delete todo: ${action.payload.error}`,
      };

    default:
      return state;
  }
}

export function useTodoReducer(initialTodos: TodoAttributes[] = []) {
  const [state, dispatch] = useReducer(todoReducer, {
    ...initialState,
    todos: initialTodos,
  });

  return { state, dispatch };
}

import { createContext, useContext, useState, ReactNode } from "react";
import { TodoAttributes, Category } from "~/types/todoTypes";

export interface TodoContextType {
  todos: TodoAttributes[];
  // addTodo: (todo: Omit<TodoAttributes, "id" | "createdAt">) => void;
  // removeTodo: (id: number) => void;
  // updateTodo: (id: number, updatedTodo: Partial<TodoAttributes>) => void;
  // filterTodosByCategory: (category: Category | null) => void;
  // toggleTodoCompletion: (id: number) => void;
  // filteredTodos: TodoAttributes[];
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

interface TodoProviderProps {
  children: ReactNode;
}

const PlaceholderTodos: TodoAttributes[] = [
  {
    id: 1,
    title: "Sample Todo 1",
    description: "This is a sample todo item.",
    completed: false,
    category: Category.WORK,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Sample Todo 2",
    description: "This is another sample todo item.",
    completed: true,
    category: Category.PERSONAL,
    createdAt: new Date(),
  },
];

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<TodoAttributes[]>(PlaceholderTodos);

  const contextValue: TodoContextType = {
    todos,
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

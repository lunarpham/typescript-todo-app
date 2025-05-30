import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { TodoAttributes } from "src/types/todoTypes";

export type ViewMode = "grid" | "list";
export type FormMode = "add" | "edit" | "view" | "closed";

export interface FormState {
  mode: FormMode;
  currentTodo: TodoAttributes | null;
  isVisible: boolean;
}

export function useUIState() {
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>("viewMode", "list");

  const [formState, setFormState] = useState<FormState>({
    mode: "closed",
    currentTodo: null,
    isVisible: false,
  });

  const openAddForm = () => {
    setFormState({
      mode: "add",
      currentTodo: null,
      isVisible: true,
    });
  };

  const openEditForm = (todo: TodoAttributes) => {
    setFormState({
      mode: "edit",
      currentTodo: todo,
      isVisible: true,
    });
  };

  const openViewForm = (todo: TodoAttributes) => {
    setFormState({
      mode: "view",
      currentTodo: todo,
      isVisible: true,
    });
  };

  const closeForm = () => {
    setFormState({
      mode: "closed",
      currentTodo: null,
      isVisible: false,
    });
  };

  return {
    viewMode,
    setViewMode,
    formState,
    openAddForm,
    openEditForm,
    openViewForm,
    closeForm,
  };
}

import { useState, useEffect } from "react";
import { useTodoContext } from "src/contexts/todoContext";
import { Category } from "src/types/todoTypes";
import { formatDateForInput, createDateFromString } from "src/utils/formatDate";

export function useTodoForm() {
  const {
    formState,
    addTodo,
    updateTodo,
    deleteTodo,
    openEditForm,
    closeForm,
  } = useTodoContext();

  // Local form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Determine if the form is in read-only mode
  const isReadOnly = formState.mode === "view";

  // Initialize form data when currentTodo changes OR when mode changes
  useEffect(() => {
    if (formState.currentTodo) {
      setFormData({
        title: formState.currentTodo.title,
        description: formState.currentTodo.description || "",
        category: formState.currentTodo.category || "",
        dueDate: formState.currentTodo?.dueDate
          ? formatDateForInput(formState.currentTodo.dueDate)
          : "",
      });
    } else if (formState.mode === "add") {
      setFormData({
        title: "",
        description: "",
        category: "NONE",
        dueDate: "",
      });
    }
    setErrors({});
  }, [formState.currentTodo, formState.mode]);

  // Form operations
  const handleInputChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const todoData = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      category:
        formData.category && formData.category !== "NONE"
          ? (formData.category as Category)
          : undefined,
      dueDate: formData.dueDate
        ? createDateFromString(formData.dueDate)
        : undefined,
      completed: formState.currentTodo?.completed || false,
    };

    if (formState.mode === "add") {
      addTodo(todoData);
      closeForm();
    } else if (formState.mode === "edit" && formState.currentTodo) {
      updateTodo(formState.currentTodo.id, todoData);
      closeForm();
    }
  };

  const handleDelete = () => {
    if (formState.currentTodo) {
      if (confirm("Are you sure you want to delete this todo?")) {
        deleteTodo(formState.currentTodo.id);
        closeForm();
      }
    }
  };

  // Fix for edit button issue - ensure we pass the current todo correctly
  const handleEditClick = () => {
    if (formState.currentTodo) {
      // Use a small timeout to avoid state update conflicts
      setTimeout(() => {
        if (formState.currentTodo) {
          openEditForm(formState.currentTodo);
        }
      }, 0);
    }
  };

  return {
    formData,
    errors,
    isReadOnly,
    handleInputChange,
    handleCategoryChange,
    handleSubmit,
    handleDelete,
    handleEditClick,
  };
}

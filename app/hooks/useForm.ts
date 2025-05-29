import { useState, ChangeEvent, FormEvent } from "react";
import { Category, TodoAttributes } from "~/types/todoTypes";

type TodoFormData = Omit<TodoAttributes, "id" | "createdAt">;

type FormErrors = {
  [K in keyof TodoFormData]?: string;
};

export function useForm(onSubmit: (data: TodoFormData) => void) {
  const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    description: "",
    completed: false,
    category: undefined,
    dueDate: undefined,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name as keyof TodoFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCategoryChange = (category: Category) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, dueDate: date }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
      // Reset form after submission
      setFormData({
        title: "",
        description: "",
        completed: false,
        category: undefined,
        dueDate: undefined,
      });
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleCategoryChange,
    handleDateChange,
    handleSubmit,
  };
}

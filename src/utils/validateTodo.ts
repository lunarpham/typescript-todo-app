export const validateTodoTitle = (title: string): string | null => {
  if (!title.trim()) {
    return "Title is required";
  }
  return null;
};

export const validateForm = (formData: {
  title: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  const titleError = validateTodoTitle(formData.title);
  if (titleError) {
    errors.title = titleError;
  }

  return errors;
};

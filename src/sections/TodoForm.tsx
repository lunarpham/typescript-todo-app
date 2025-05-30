import { X, Trash2, Edit3, Eye } from "lucide-react";
import InputField from "src/components/InputField";
import Select from "src/components/Select";
import { Category } from "src/types/todoTypes";
import { useTodoForm } from "src/hooks/useTodoForm";
import { useTodoContext } from "src/contexts/todoContext";
import { formatDateDisplay } from "src/utils/formatDate";

export default function TodoForm() {
  const { formState, closeForm } = useTodoContext();

  const {
    formData,
    errors,
    isReadOnly,
    handleInputChange,
    handleCategoryChange,
    handleSubmit,
    handleDelete,
    handleEditClick,
  } = useTodoForm();

  const getFormTitle = () => {
    switch (formState.mode) {
      case "add":
        return "Add New Todo";
      case "edit":
        return "Edit Todo";
      case "view":
        return "Todo Details";
      default:
        return "";
    }
  };

  const getFormIcon = () => {
    switch (formState.mode) {
      case "add":
        return null;
      case "edit":
        return <Edit3 size={20} />;
      case "view":
        return <Eye size={20} />;
      default:
        return null;
    }
  };

  const categories = Object.values(Category).map((category) => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
  }));

  const handleEditClickWithDebug = () => {
    handleEditClick();
  };

  if (!formState.isVisible) {
    return null;
  }

  return (
    <div className="min-h-screen w-96 p-6 space-y-4 border-l">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getFormIcon()}
          <h1 className="font-semibold text-3xl">{getFormTitle()}</h1>
        </div>
        <button
          onClick={closeForm}
          className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <InputField
            name="title"
            type="text"
            placeholder="Todo Title"
            value={formData.title}
            onChange={(value) => handleInputChange(value, "title")}
            disabled={isReadOnly}
            required
            className="bg-black/10 rounded-md focus:ring-2 focus:ring-blue-500 h-12"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <InputField
          name="description"
          type="textarea"
          placeholder="Todo Description"
          value={formData.description}
          onChange={(value) => handleInputChange(value, "description")}
          disabled={isReadOnly}
          className="bg-black/10 rounded-md focus:ring-2 focus:ring-blue-500 h-32"
        />

        <div className="grid grid-cols-10 items-center gap-4">
          <div className="col-span-3 font-medium">Due Date</div>
          <div className="col-span-7">
            <InputField
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(value) => handleInputChange(value, "dueDate")}
              disabled={isReadOnly}
              className="bg-black/10 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-10 items-center gap-4">
          <div className="col-span-3 font-medium">Category</div>
          <div className="col-span-7">
            <Select
              placeholder="Select category"
              options={categories}
              value={formData.category}
              onChange={handleCategoryChange}
              disabled={isReadOnly}
              anchor="top left"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {formState.mode === "view" ? (
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={handleEditClickWithDebug}
                className="flex-1 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit3 size={16} />
                Edit Todo
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          ) : (
            <div className="flex gap-3 w-full">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
              >
                {formState.mode === "add" ? "Add Todo" : "Update Todo"}
              </button>
              {formState.mode === "edit" && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </form>

      {/* Additional Info for View Mode */}
      {formState.mode === "view" && formState.currentTodo && (
        <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {formatDateDisplay(formState.currentTodo.createdAt)}
          </div>
          <div>
            <span className="font-medium">Status:</span>{" "}
            {formState.currentTodo.completed ? "Completed" : "Pending"}
          </div>
        </div>
      )}
    </div>
  );
}

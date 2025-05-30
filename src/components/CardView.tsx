import { Plus, Check, Calendar, Eye } from "lucide-react";
import { useTodoContext } from "src/contexts/todoContext";
import { categoryColors } from "src/types/todoTypes";
import { formatDateDisplay } from "src/utils/formatDate"; // Import the date utility

export default function CardView() {
  const { toggleTodo, openAddForm, openViewForm, filteredAndSortedTodos } =
    useTodoContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* Add Todo Card */}
      <div
        onClick={openAddForm}
        className="cursor-pointer p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 flex flex-col items-center justify-center min-h-[200px] group"
      >
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
          <Plus size={24} className="text-blue-600" />
        </div>
        <span className="text-gray-600 font-medium group-hover:text-blue-600 transition-colors">
          Add New Task
        </span>
      </div>

      {/* Todo Cards */}
      {filteredAndSortedTodos.map((todo) => (
        <div
          key={todo.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 min-h-[200px] flex flex-col"
        >
          {/* Header with checkbox and category */}
          <div className="flex items-start justify-between mb-3">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                    todo.completed
                      ? "bg-blue-500 border-blue-500"
                      : "bg-gray-100 border-gray-300 border"
                  }`}
                >
                  {todo.completed && (
                    <Check size={14} className="text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
            </label>

            {todo.category && (
              <div
                className={`w-4 h-4 rounded-sm ${
                  categoryColors[todo.category]
                }`}
                title={todo.category}
              ></div>
            )}
          </div>

          {/* Title */}
          <h3
            className={`font-semibold text-lg mb-2 flex-grow ${
              todo.completed ? "line-through opacity-50" : ""
            }`}
          >
            {todo.title}
          </h3>

          {/* Description */}
          {todo.description && (
            <p className="opacity-60 text-sm mb-3 line-clamp-2">
              {todo.description}
            </p>
          )}

          {/* Footer */}
          <div className="mt-auto">
            {/* Due Date - Using the formatDateDisplay utility */}
            {todo.dueDate && (
              <div className="flex items-center gap-1 text-xs mb-3">
                <Calendar size={12} />
                <span>{formatDateDisplay(todo.dueDate)}</span>
              </div>
            )}

            {/* View Button */}
            <button
              onClick={() => openViewForm(todo)}
              className="w-full bg-neutral-200 py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Eye size={14} />
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

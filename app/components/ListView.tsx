import { Plus, Check, ChevronRight, Calendar } from "lucide-react";
import { useTodoContext } from "~/contexts/todoContext";
import { categoryColors } from "~/types/todoTypes";

export default function ListView() {
  const { actions, filteredAndSortedTodos } = useTodoContext();

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="">
      <button
        onClick={actions.openAddForm}
        className="cursor-pointer p-4 border-t w-full border-gray-200 text-left flex items-center gap-2 hover:bg-black/10 font-medium text-black/70"
      >
        <Plus size={20} />
        <span>Add new Task</span>
      </button>

      {filteredAndSortedTodos.map((todo) => (
        <div
          key={todo.id}
          className="border-t w-full border-gray-200 text-left grid grid-cols-12 font-medium text-black/70 items-center hover:bg-black/5"
        >
          <div className="col-span-1 p-4">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={todo.completed}
                  onChange={() => actions.toggleTodo(todo.id)}
                />
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                    todo.completed
                      ? "bg-blue-500 border-blue-500"
                      : "bg-black/10"
                  }`}
                >
                  {todo.completed && (
                    <Check size={14} className="text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
            </label>
          </div>

          <div className="col-span-10 p-4">
            <div className="flex items-center gap-2 mb-1">
              {todo.category && (
                <div
                  className={`w-3 h-3 rounded-sm ${
                    categoryColors[todo.category]
                  }`}
                ></div>
              )}
              <div
                className={`font-medium ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.title}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-black/50">
              {todo.dueDate && (
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(todo.dueDate)}</span>
                </span>
              )}
              <span>Created: {formatDate(todo.createdAt)}</span>
            </div>
          </div>

          <div className="col-span-1 flex justify-center items-center h-full">
            <button
              onClick={() => actions.openViewForm(todo)}
              className="cursor-pointer p-2 rounded hover:bg-black/10"
            >
              <ChevronRight size={24} className="text-black/40" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

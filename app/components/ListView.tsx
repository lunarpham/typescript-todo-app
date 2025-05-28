import { useState } from "react";
import { Plus, Check, ChevronRight, Calendar } from "lucide-react";

export default function ListView() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="">
      <button className="cursor-pointer p-4 border-t w-full border-gray-200 text-left flex items-center gap-2 hover:bg-black/10 font-medium text-black/70">
        <Plus size={20} />
        <span>Add new Task</span>
      </button>
      <div className="border-t w-full border-gray-200 text-left grid grid-cols-12 font-medium text-black/70 items-center">
        <div className="col-span-1 p-4 ">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              {/* Hidden actual checkbox */}
              <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />

              {/* Custom checkbox */}
              <div
                className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                  isChecked
                    ? "bg-blue-500 border-blue-500 dark:bg-blue-600 dark:border-blue-600"
                    : "bg-black/10"
                }`}
              >
                {isChecked && (
                  <Check size={14} className="text-white" strokeWidth={3} />
                )}
              </div>
            </div>
          </label>
        </div>
        <div className="col-span-10 p-4 ">
          <div className="font-medium">Task Title</div>
          <span className="flex items-center gap-1 text-sm text-black/50">
            <Calendar size={14} />
            <span>25-05-28</span>
          </span>
        </div>

        <div className="col-span-1 flex justify-center items-center h-full cursor-pointer">
          <ChevronRight size={30} className="text-black/20" />
        </div>
      </div>
    </div>
  );
}

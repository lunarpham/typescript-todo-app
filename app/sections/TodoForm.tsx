import { useState } from "react";
import InputField from "~/components/InputField";
import Select from "~/components/Select";
import { Category, categoryColors } from "~/types/todoTypes";

export default function TodoForm() {
  const categories = Object.keys(Category).map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    color: categoryColors[key as keyof typeof categoryColors],
  }));

  const [selectedValue, setSelectedValue] = useState("");
  return (
    <div className="min-h-screen p-6 bg-black/5 space-y-4 w-6/12 relative">
      <h1 className="font-semibold text-3xl">Add New Todo</h1>
      <form className="space-y-4">
        <InputField
          name="title"
          type="text"
          placeholder="Todo Title"
          className="bg-black/10 rounded-md focus:ring-2 focus:ring-blue-500 h-12"
        />
        <InputField
          name="description"
          type="textarea"
          placeholder="Todo Description"
          className="bg-black/10 rounded-md focus:ring-2 focus:ring-blue-500 h-56"
        />
        <div className="grid grid-cols-10 items-center gap-2  ">
          <div className="col-span-3">Due Date</div>
          <div className="col-span-7">
            <InputField
              name="dueDate"
              type="date"
              className="bg-black/10 rounded-md focus:ring-2 focus:ring-blue-500 max-w-36"
            />
          </div>
        </div>
        <div className="grid grid-cols-10 items-center gap-2">
          <div className="col-span-3">Type</div>
          <div className="col-span-7">
            <Select
              placeholder="Hello"
              options={categories}
              value={selectedValue}
              onChange={(newValue) => {
                console.log("Parent received:", newValue);
                setSelectedValue(newValue);
              }}
              anchor="top left"
              className="max-w-36"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

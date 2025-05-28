import { useState, useEffect } from "react";
import InputField from "~/components/InputField";
import { useTodoContext } from "~/contexts/todoContext";

export default function Search() {
  return (
    <div>
      <InputField
        placeholder="Search todos..."
        className="bg-black/10 rounded-md focus:ring-2 focus:ring-blue-500"
        name="search-todos"
        type="search"
      />
    </div>
  );
}

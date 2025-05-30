import { useState, useEffect } from "react";
import InputField from "src/components/InputField";
import { useTodoContext } from "src/contexts/todoContext";

export default function Search() {
  const { filters, setSearch } = useTodoContext();
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(localSearchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, setSearch]);

  useEffect(() => {
    setLocalSearchTerm(filters.search);
  }, [filters.search]);

  return (
    <div>
      <InputField
        placeholder="Search todos..."
        className="bg-black/10 rounded-md focus:ring-2 focus:ring-blue-500"
        name="search-todos"
        type="search"
        value={localSearchTerm}
        onChange={setLocalSearchTerm}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import InputField from "~/components/InputField";
import { useTodoContext } from "~/contexts/todoContext";

export default function Search() {
  const { state, actions } = useTodoContext();
  const [localSearchTerm, setLocalSearchTerm] = useState(
    state.filters.searchTerm
  );

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      actions.setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, actions]);

  // Update local state when global state changes
  useEffect(() => {
    setLocalSearchTerm(state.filters.searchTerm);
  }, [state.filters.searchTerm]);

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

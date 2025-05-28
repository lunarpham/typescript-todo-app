import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type SelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  anchor?: "top right" | "top left" | "bottom right" | "bottom left";
};

export default function Select({
  value,
  onChange,
  className = "",
  name = "",
  disabled = false,
  required = false,
  placeholder = "Select an option",
  options = [],
  anchor = "bottom left",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    console.log("Selected value:", optionValue); // Debug log
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);
  console.log("Current value:", value, "Selected option:", selectedOption); // Debug log

  const getDropdownPosition = () => {
    const baseClasses = "absolute z-50 w-full";
    switch (anchor) {
      case "top left":
        return `${baseClasses} bottom-full left-0 mb-1`;
      case "top right":
        return `${baseClasses} bottom-full right-0 mb-1`;
      case "bottom right":
        return `${baseClasses} top-full right-0 mt-1`;
      default: // "bottom left"
        return `${baseClasses} top-full left-0 mt-1`;
    }
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={value || ""}
        required={required}
      />
      {/* Custom Select Button */}
      <button
        type="button"
        className={`
          bg-black/10 rounded-md w-full px-3 py-2
          flex items-center justify-between
          focus:ring-2 focus:ring-blue-500 focus:outline-none
          hover:bg-black/15 transition-colors
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${isOpen ? "ring-2 ring-blue-500" : ""}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span
          className={`text-left ${
            !selectedOption ? "text-gray-500" : "text-gray-900"
          }`}
        >
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className={getDropdownPosition()}>
          <div className="bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-gray-500 text-sm">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`
                    w-full px-3 py-2 text-left hover:bg-blue-50 transition-colors cursor-pointer  
                    ${
                      value === option.value
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700"
                    }
                    ${value === option.value ? "font-medium" : ""}
                    first:rounded-t-md last:rounded-b-md
                  `}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

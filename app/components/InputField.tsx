import { Search } from "lucide-react";

type InputFieldProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function InputField({
  value = "",
  onChange,
  placeholder = "Enter text",
  type = "text",
  className = "",
  name = "input-field",
  disabled = false,
  required = false,
}: InputFieldProps) {
  return (
    <label
      htmlFor={name}
      className={`w-full flex gap-2 items-center justify-start p-2 rounded ${
        type === "text" ? "text-gray-800" : "text-gray-600"
      } focus-within:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-colors duration-200 ${className}`
        .trim()
        .replace(/\s+/g, " ")}
    >
      {type === "search" && <Search className="text-gray-500" size={16} />}
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          disabled={disabled}
          required={required}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none focus:ring-0 focus:outline-none text-sm resize-none"
        />
      ) : (
        <input
          id={name}
          name={name}
          disabled={disabled}
          required={required}
          type={type}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none focus:ring-0 focus:outline-none text-sm"
        />
      )}
    </label>
  );
}

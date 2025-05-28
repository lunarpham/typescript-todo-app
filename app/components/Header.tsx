import { Moon, Sun } from "lucide-react";
import { useTheme } from "~/contexts/themeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="font-semibold text-xl">Todo App</h1>
      <button
        onClick={toggleTheme}
        className="cursor-pointer"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </div>
  );
}

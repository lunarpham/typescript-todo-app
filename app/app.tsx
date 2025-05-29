import type { Route } from "./+types/app";
import TodoList from "./sections/TodoList";
import Sidebar from "./sections/Sidebar";
import TodoForm from "./sections/TodoForm";
import { TodoProvider } from "./contexts/todoContext";
import { ThemeProvider } from "./contexts/themeContext";

function AppContent() {
  return (
    <div className="flex relative overflow-hidden min-h-screen">
      <Sidebar />
      <div className="flex-grow transition-all duration-300 ease-in-out">
        <TodoList />
      </div>
      <TodoForm />
    </div>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo List Application" },
    { name: "description", content: "Welcome to My Todo List" },
  ];
}

export default function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <AppContent />
      </TodoProvider>
    </ThemeProvider>
  );
}

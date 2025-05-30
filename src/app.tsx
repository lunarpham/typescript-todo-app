import type { Route } from "./+types/app";
import TodoList from "./sections/TodoList";
import Sidebar from "./sections/Sidebar";
import TodoForm from "./sections/TodoForm";
import { TodoProvider } from "./contexts/todoContext";

function AppContent() {
  return (
    <div className="flex relative overflow-hidden min-h-screen">
      <div className="shrink-0">
        <Sidebar />
      </div>
      <div className="flex-grow transition-all duration-300 ease-in-out">
        <TodoList />
      </div>
      <div className="shrink-0">
        <TodoForm />
      </div>
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
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

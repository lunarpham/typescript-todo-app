import Header from "../components/Header";
import Search from "../components/Search";
import Filter from "../components/Filter";

export default function Sidebar() {
  return (
    <div className="min-h-screen w-80 p-6 border-r border-gray-300 space-y-4">
      <Header />
      <Search />
      <Filter />
    </div>
  );
}

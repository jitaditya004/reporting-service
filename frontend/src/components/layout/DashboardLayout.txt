import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex">
      <Sidebar />

      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
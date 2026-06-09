const items = [
  "Dashboard",
  "Student MIS",
  "Teacher MIS",
  "Analytics",
  "Audit Logs",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#111827] border-r border-white/10 p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">
          MIS Enterprise
        </h1>

        <p className="text-sm text-gray-400 mt-2">
          Reporting Platform
        </p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
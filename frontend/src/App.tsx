export default function App() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$1.24M",
      change: "+12.5%",
    },
    {
      title: "Active Employees",
      value: "2,481",
      change: "+4.2%",
    },
    {
      title: "Reports Generated",
      value: "18,920",
      change: "+18.1%",
    },
    {
      title: "Pending Approvals",
      value: "34",
      change: "-6.3%",
    },
  ];

  const reports = [
    {
      name: "Quarterly Financial Summary",
      department: "Finance",
      status: "Completed",
      updated: "2 mins ago",
    },
    {
      name: "Employee Performance Analytics",
      department: "HR",
      status: "In Review",
      updated: "15 mins ago",
    },
    {
      name: "Inventory Utilization Report",
      department: "Operations",
      status: "Completed",
      updated: "1 hour ago",
    },
    {
      name: "Regional Sales Insights",
      department: "Sales",
      status: "Pending",
      updated: "3 hours ago",
    },
  ];

  const activities = [
    "Admin generated Q2 financial report",
    "New employee analytics dashboard published",
    "Sales KPI report exported as Excel",
    "Weekly audit log synchronized",
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex">
      <aside className="w-72 bg-[#111827] border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-wide">
              MIS Enterprise
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Reporting & Analytics Platform
            </p>
          </div>

          <nav className="space-y-2">
            {[
              "Dashboard",
              "Reports",
              "Analytics",
              "Departments",
              "Employees",
              "Audit Logs",
              "Notifications",
              "Settings",
            ].map((item) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  item === "Dashboard"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-white/5 text-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-sm text-gray-400">Logged in as</p>
          <h2 className="font-semibold mt-1">System Administrator</h2>
          <p className="text-xs text-gray-500 mt-2">
            Enterprise Access Level
          </p>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold">
              Enterprise MIS Dashboard
            </h2>
            <p className="text-gray-400 mt-2">
              Real-time operational analytics and reporting overview.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              Export Report
            </button>
            <button className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition shadow-lg">
              Generate Report
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm shadow-xl"
            >
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <h3 className="text-3xl font-bold mt-3">{stat.value}</h3>
              <span className="inline-block mt-4 text-sm px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                {stat.change}
              </span>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold">
                  Analytics Overview
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Monthly enterprise performance metrics
                </p>
              </div>

              <select title="Details of period" className="bg-[#1f2937] border border-white/10 rounded-xl px-4 py-2 text-sm outline-none">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>

            <div className="h-80 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-white/10 flex items-end gap-4 p-6 overflow-hidden">
              {[35, 55, 48, 75, 62, 90, 78, 98].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-2xl bg-gradient-to-t from-blue-500 to-cyan-400 shadow-lg"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-semibold mb-6">
              Recent Activities
            </h3>

            <div className="space-y-5">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
                >
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="text-sm leading-relaxed">{activity}</p>
                    <span className="text-xs text-gray-500 mt-1 inline-block">
                      {index + 1} hour ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold">Generated Reports</h3>
              <p className="text-gray-400 text-sm mt-1">
                Enterprise reporting workflow and approval tracking
              </p>
            </div>

            <input
              placeholder="Search reports..."
              className="bg-[#1f2937] border border-white/10 rounded-xl px-4 py-3 w-72 outline-none"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Report</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr
                    key={report.name}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-5 font-medium">{report.name}</td>
                    <td className="px-6 py-5 text-gray-300">
                      {report.department}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs border ${
                          report.status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/20"
                            : report.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
                            : "bg-blue-500/20 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-400">
                      {report.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

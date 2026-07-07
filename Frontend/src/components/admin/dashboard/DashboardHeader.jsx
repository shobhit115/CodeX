import React from "react";
import { CalendarDays } from "lucide-react";

export default function DashboardHeader() {
  const currentDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time metrics and system health
        </p>
      </div>
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm text-sm font-medium text-slate-700">
        <CalendarDays className="w-4 h-4 text-slate-400" />
        {currentDate}
      </div>
    </header>
  );
}

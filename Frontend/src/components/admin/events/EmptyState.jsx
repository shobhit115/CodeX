import React from "react";
import { Calendar } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
      <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        No Active Events
      </h3>
      <p className="text-slate-500 text-sm">
        Click "Create Event" to schedule a new one.
      </p>
    </div>
  );
}

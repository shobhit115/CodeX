import React from "react";
import { Plus } from "lucide-react";

export default function EventHeader({ openCreateModal }) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Event Management</h1>
        <p className="text-sm text-slate-500 mt-1">
          Create, edit, and organize public events.
        </p>
      </div>
      <button
        onClick={openCreateModal}
        className="flex items-center justify-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Create Event
      </button>
    </header>
  );
}

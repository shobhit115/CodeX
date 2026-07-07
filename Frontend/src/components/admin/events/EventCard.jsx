import React from "react";
import { Image as ImageIcon, Calendar, Edit, Trash2 } from "lucide-react";

export default function EventCard({ event, openEditModal, handleDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
      <div className="h-48 w-full bg-slate-100 border-b border-slate-100 relative overflow-hidden flex items-center justify-center">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.eventName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <ImageIcon className="w-10 h-10 text-slate-300" />
        )}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center">
          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "short",
            })}
          </span>
          <span className="text-lg font-bold text-slate-900 leading-none">
            {new Date(event.date).getDate()}
          </span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3
          className="text-lg font-bold text-slate-900 mb-2 line-clamp-1"
          title={event.eventName}
        >
          {event.eventName}
        </h3>

        <div className="flex items-center gap-2 text-slate-500 mb-4 text-xs font-medium">
          <Calendar className="w-4 h-4 text-slate-400" />
          {new Date(event.date).toLocaleDateString()} at{" "}
          {new Date(event.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
          {event.description}
        </p>
        <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100">
          <button
            onClick={() => openEditModal(event)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded-lg text-sm font-medium transition-colors border border-slate-200 hover:border-teal-200"
          >
            <Edit className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => handleDelete(event._id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-lg text-sm font-medium transition-colors border border-slate-200 hover:border-red-200"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

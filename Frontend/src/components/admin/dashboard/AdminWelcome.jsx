import React from "react";

export default function AdminWelcome() {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="relative z-10">
        <p className="text-slate-300 text-sm mb-1">Welcome back,</p>
        <h2 className="text-3xl font-bold mb-4">Admin User</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-[85%]">
          Here's what's happening with Codex today.
        </p>
      </div>
    </div>
  );
}

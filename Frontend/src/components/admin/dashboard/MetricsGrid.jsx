import React from "react";
import { Users, Calendar, Activity, ShieldCheck } from "lucide-react";

export default function MetricsGrid({ metrics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-teal-50 rounded-lg">
            <Users className="w-6 h-6 text-teal-600" />
          </div>
          <span className="text-sm font-medium text-slate-500">
            Pending Applications
          </span>
        </div>
        <div>
          <span className="text-3xl font-bold text-slate-900">
            {metrics.loading ? "-" : metrics.pendingApps}
          </span>
          <p className="text-xs font-medium text-teal-600 mt-2">
            Real-time sync
          </p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-slate-500">
            Active Events
          </span>
        </div>
        <div>
          <span className="text-3xl font-bold text-slate-900">
            {metrics.loading ? "-" : metrics.activeEvents}
          </span>
          <p className="text-xs font-medium text-teal-600 mt-2">
            Real-time sync
          </p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-50 rounded-lg">
            <Activity className="w-6 h-6 text-amber-600" />
          </div>
          <span className="text-sm font-medium text-slate-500">
            Live Sessions
          </span>
        </div>
        <div>
          <span className="text-3xl font-bold text-slate-900">
            {metrics.loading ? "-" : metrics.liveSessions}
          </span>
          <p className="text-xs font-medium text-teal-600 mt-2">
            Real-time sync
          </p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-slate-500">
            System Status
          </span>
        </div>
        <div>
          <span className="text-3xl font-bold text-slate-900">OK</span>
          <p className="text-xs font-medium text-teal-600 mt-2">
            All systems operational
          </p>
        </div>
      </div>
    </div>
  );
}

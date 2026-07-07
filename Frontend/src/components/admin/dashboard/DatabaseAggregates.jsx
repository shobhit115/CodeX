import React from "react";
import { Link } from "react-router-dom";

export default function DatabaseAggregates({ metrics }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900">Database Aggregates</h3>
        <Link
          to="/admin/events"
          className="text-xs font-medium text-teal-600 hover:underline"
        >
          Manage Records
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-sm font-medium text-slate-600">
            Total Applications Received
          </span>
          <span className="text-xl font-bold text-slate-900">
            {metrics.loading ? "-" : metrics.totalApps}
          </span>
        </div>
        <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-sm font-medium text-slate-600">
            Total Events Hosted
          </span>
          <span className="text-xl font-bold text-slate-900">
            {metrics.loading ? "-" : metrics.activeEvents}
          </span>
        </div>
        <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-sm font-medium text-slate-600">
            Active Team Roster
          </span>
          <span className="text-xl font-bold text-slate-900">
            {metrics.loading ? "-" : metrics.teamSize}
          </span>
        </div>
      </div>
    </div>
  );
}

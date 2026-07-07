import { useState, useEffect } from "react";
import axios from "axios";
import { registrationService } from "../../services/registrationService";
import { adminService } from "../../services/adminService";

import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import AdminWelcome from "../../components/admin/dashboard/AdminWelcome";
import QuickActions from "../../components/admin/dashboard/QuickActions";
import MetricsGrid from "../../components/admin/dashboard/MetricsGrid";
import DatabaseAggregates from "../../components/admin/dashboard/DatabaseAggregates";
import RecentRegistrations from "../../components/admin/dashboard/RecentRegistrations";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    pendingApps: 0,
    activeEvents: 0,
    liveSessions: 0,
    totalApps: 0,
    teamSize: 0,
    loading: true,
  });

  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [pendingRes, allRegRes, eventsRes, sessionsRes, teamRes] =
          await Promise.all([
            registrationService.getRegistrations({ status: "PENDING" }),
            registrationService.getRegistrations({ limit: 5 }),
            axios.get("/api/v1/events", { withCredentials: true }),
            adminService.getSessions(),
            axios.get("/api/v1/teams", { withCredentials: true }),
          ]);

        const pendingData = pendingRes.data?.data || pendingRes.data || {};
        const allRegData = allRegRes.data?.data || allRegRes.data || {};
        const evData = eventsRes.data?.data || eventsRes.data || [];
        const sessData = sessionsRes.data?.data || sessionsRes.data || [];
        const teamData = teamRes.data?.data || teamRes.data || [];

        setMetrics({
          pendingApps: pendingData.total || 0,
          totalApps: allRegData.total || 0,
          activeEvents: evData.length || 0,
          liveSessions: sessData.length || 0,
          teamSize: teamData.length || 0,
          loading: false,
        });

        setRecentLogs(
          allRegData.registrations ||
            (Array.isArray(allRegData) ? allRegData : [])
        );
      } catch (error) {
        console.error("Failed to fetch dashboard metrics:", error);
        setMetrics((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="p-8 lg:p-10 font-sans text-slate-900 min-h-full">
      <DashboardHeader />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <AdminWelcome />
          <QuickActions />
        </div>
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <MetricsGrid metrics={metrics} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DatabaseAggregates metrics={metrics} />
            <RecentRegistrations metrics={metrics} recentLogs={recentLogs} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../../services/api";
import DashboardCard from "../../components/admin/DashboardCard";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTemples: 0,
    totalSlots: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard");

      setStats(response.data.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to load dashboard."
      );
    }
  };

  return (
    <div>

      <h2 className="mb-4">Dashboard</h2>

      <div className="row">

        <DashboardCard
          title="Total Users"
          value={stats.totalUsers}
          color="primary"
        />

        <DashboardCard
          title="Total Temples"
          value={stats.totalTemples}
          color="success"
        />

        <DashboardCard
          title="Total Slots"
          value={stats.totalSlots}
          color="warning"
        />

        <DashboardCard
          title="Total Bookings"
          value={stats.totalBookings}
          color="info"
        />

        <DashboardCard
          title="Revenue"
          value={`₹${stats.totalRevenue}`}
          color="danger"
        />

      </div>

    </div>
  );
}

export default Dashboard;
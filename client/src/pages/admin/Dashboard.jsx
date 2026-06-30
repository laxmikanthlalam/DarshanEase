import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import DashboardCard from "../../components/admin/DashboardCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTemples: 0,
    totalSlots: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  const barData = {
  labels: [
    "Users",
    "Temples",
    "Slots",
    "Bookings",
  ],
  datasets: [
    {
      label: "System Statistics",
      data: [
        stats.totalUsers,
        stats.totalTemples,
        stats.totalSlots,
        stats.totalBookings,
      ],
      backgroundColor: [
        "#0d6efd",
        "#198754",
        "#ffc107",
        "#0dcaf0",
      ],
    },
  ],
};

const pieData = {
  labels: [
    "Users",
    "Temples",
    "Slots",
    "Bookings",
  ],
  datasets: [
    {
      data: [
        stats.totalUsers,
        stats.totalTemples,
        stats.totalSlots,
        stats.totalBookings,
      ],
      backgroundColor: [
        "#0d6efd",
        "#198754",
        "#ffc107",
        "#dc3545",
      ],
    },
  ],
};

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard");

      setStats(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <h3 className="text-center mt-5">
          Loading Dashboard...
        </h3>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h2 className="fw-bold">
          Admin Dashboard
        </h2>

        <p className="text-muted">
          Welcome to DarshanEase Administration Panel
        </p>
      </div>

      <div className="row g-4">

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
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          color="danger"
        />

      </div>

      <div className="card shadow mt-5">
        <div className="row mt-5">

  <div className="col-lg-8 mb-4">
    <div className="card shadow h-100">
      <div className="card-body">

        <h4 className="mb-4">
          Dashboard Statistics
        </h4>

        <Bar data={barData} />

      </div>
    </div>
  </div>

  <div className="col-lg-4 mb-4">
    <div className="card shadow h-100">
      <div className="card-body">

        <h4 className="mb-4">
          Distribution
        </h4>

        <Pie data={pieData} />

      </div>
    </div>
  </div>

</div>
        <div className="card-body">

          <h4 className="mb-3">
            System Summary
          </h4>

          <p>
            Total Registered Users :
            <strong> {stats.totalUsers}</strong>
          </p>

          <p>
            Total Temples :
            <strong> {stats.totalTemples}</strong>
          </p>

          <p>
            Total Darshan Slots :
            <strong> {stats.totalSlots}</strong>
          </p>

          <p>
            Total Bookings :
            <strong> {stats.totalBookings}</strong>
          </p>

          <p className="mb-0">
            Total Revenue :
            <strong className="text-success">
              {" "}
              ₹{stats.totalRevenue.toLocaleString()}
            </strong>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
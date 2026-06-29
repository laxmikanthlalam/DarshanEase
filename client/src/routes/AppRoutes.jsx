import { Routes, Route } from "react-router-dom";

// User Pages
import Home from "../pages/Home";
import Temples from "../pages/Temples";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MyBookings from "../pages/MyBookings";
import TempleDetails from "../pages/TempleDetails";
import Booking from "../pages/Booking";
import NotFound from "../pages/NotFound";

// Admin Layout
import AdminLayout from "../layouts/AdminLayout";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminTemples from "../pages/admin/Temples";
import AdminSlots from "../pages/admin/Slots";
import AdminBookings from "../pages/admin/Bookings";
import AddTemple from "../pages/admin/AddTemple";
import EditTemple from "../pages/admin/EditTemple";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= USER ROUTES ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/temples" element={<Temples />} />

      <Route path="/temple/:id" element={<TempleDetails />} />

      <Route path="/booking/:slotId" element={<Booking />} />

      <Route path="/bookings" element={<MyBookings />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      {/* ================= ADMIN ROUTES ================= */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route path="temples" element={<AdminTemples />} />

        <Route path="add-temple" element={<AddTemple />} />

        <Route
          path="edit-temple/:id"
          element={<EditTemple />}
        />

        <Route path="slots" element={<AdminSlots />} />

        <Route path="bookings" element={<AdminBookings />} />
      </Route>

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
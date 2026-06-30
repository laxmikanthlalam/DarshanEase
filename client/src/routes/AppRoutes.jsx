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

// Route Protection
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import GuestRoute from "./GuestRoute";

// Admin Layout
import AdminLayout from "../layouts/AdminLayout";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminTemples from "../pages/admin/Temples";
import AdminSlots from "../pages/admin/Slots";
import AdminBookings from "../pages/admin/Bookings";
import AddTemple from "../pages/admin/AddTemple";
import EditTemple from "../pages/admin/EditTemple";
import AddSlot from "../pages/admin/AddSlot";
import EditSlot from "../pages/admin/EditSlot";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/temples" element={<Temples />} />

      <Route
        path="/temple/:id"
        element={<TempleDetails />}
      />

      {/* ================= GUEST ROUTES ================= */}

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* ================= PROTECTED USER ROUTES ================= */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/booking/:slotId"
        element={
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        }
      />

      <Route
        path="/bookings"
        element={
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        {/* Temple Management */}

        <Route
          path="temples"
          element={<AdminTemples />}
        />

        <Route
          path="add-temple"
          element={<AddTemple />}
        />

        <Route
          path="edit-temple/:id"
          element={<EditTemple />}
        />

        {/* Slot Management */}

        <Route
          path="slots"
          element={<AdminSlots />}
        />

        <Route
          path="add-slot"
          element={<AddSlot />}
        />

        <Route
          path="edit-slot/:id"
          element={<EditSlot />}
        />

        {/* Booking Management */}

        <Route
          path="bookings"
          element={<AdminBookings />}
        />
      </Route>

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRoutes;
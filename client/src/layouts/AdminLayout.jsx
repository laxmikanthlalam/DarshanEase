import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Topbar />

        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
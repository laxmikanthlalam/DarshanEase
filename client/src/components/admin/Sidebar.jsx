import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="mb-4">DarshanEase</h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-3">
          <Link
            to="/admin"
            className="nav-link text-white"
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link
            to="/admin/temples"
            className="nav-link text-white"
          >
            Temples
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link
            to="/admin/slots"
            className="nav-link text-white"
          >
            Slots
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link
            to="/admin/bookings"
            className="nav-link text-white"
          >
            Bookings
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
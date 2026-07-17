import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
<<span
  className="fw-bold"
  style={{
    color: "#fff",
    fontSize: "1.8rem",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "1px",
  }}
>
  Darshan<span style={{ color: "#FFD700" }}>Ease</span>
</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Always Visible */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/temples">
                Temples
              </Link>
            </li>

            {/* Logged In User */}
            {token && (
  <>
    {user?.role !== "ADMIN" && (
      <li className="nav-item">
        <Link className="nav-link" to="/bookings">
          My Bookings
        </Link>
      </li>
    )}

    {user?.role === "ADMIN" && (
      <li className="nav-item">
        <Link className="nav-link" to="/admin">
          Admin
        </Link>
      </li>
    )}
  </>
)}
            {/* Guest */}
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item ms-2">
                  <Link className="btn btn-warning" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown ms-3">
                <button
                  className="btn btn-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  👤 {user?.fullName}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      👤 My Profile
                    </Link>
                    </li>
                  {user?.role !== "ADMIN" && (
  <li>
    <Link className="dropdown-item" to="/bookings">
      My Bookings
    </Link>
  </li>
)}

                  {user?.role === "ADMIN" && (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <Link className="dropdown-item" to="/admin">
                          Admin Dashboard
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
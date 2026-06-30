import {
  FaUsers,
  FaPlaceOfWorship,
  FaCalendarAlt,
  FaClipboardList,
  FaRupeeSign,
} from "react-icons/fa";

function DashboardCard({ title, value, color }) {
  const getIcon = () => {
    switch (title) {
      case "Total Users":
        return <FaUsers size={40} />;

      case "Total Temples":
        return <FaPlaceOfWorship size={40} />;

      case "Total Slots":
        return <FaCalendarAlt size={40} />;

      case "Total Bookings":
        return <FaClipboardList size={40} />;

      case "Revenue":
        return <FaRupeeSign size={40} />;

      default:
        return null;
    }
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        className={`card bg-${color} text-white border-0 shadow-lg h-100`}
        style={{
          borderRadius: "18px",
          transition: "0.3s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h6 className="text-uppercase fw-light">
                {title}
              </h6>

              <h2 className="fw-bold mt-3">
                {value}
              </h2>
            </div>

            <div className="opacity-75">
              {getIcon()}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
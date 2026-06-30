import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState({
  totalUsers: 0,
  totalTemples: 0,
  totalSlots: 0,
  totalBookings: 0,
});
const [featuredTemples, setFeaturedTemples] = useState([]);
useEffect(() => {
  fetchStats();
  fetchFeaturedTemples();
}, []);

const fetchStats = async () => {
  try {
    const response = await api.get("/stats");

    setStats(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchFeaturedTemples = async () => {
  try {
    const response = await api.get("/temples/featured");

    setFeaturedTemples(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
      {/* Hero Section */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          minHeight: "90vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/1280px-Tirumala_090615.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center">
          <h1 className="display-3 fw-bold">
            Book Temple Darshan Online
          </h1>

          <p className="lead mt-4">
            Skip long queues and reserve your darshan slot
            in just a few clicks.
          </p>

          <div className="mt-4">
            <Link
              to="/temples"
              className="btn btn-warning btn-lg me-3"
            >
              Explore Temples
            </Link>

            {token ? (
  <Link
    to="/temples"
    className="btn btn-outline-light btn-lg"
  >
    Book Now
  </Link>
) : (
  <Link
    to="/register"
    className="btn btn-outline-light btn-lg"
  >
    Get Started
  </Link>
)}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-5 bg-light">
        <div className="container">

          <div className="row text-center">

           <div className="col-md-3 mb-4">
  <div className="card shadow border-0">
    <div className="card-body">
      <h1>🛕</h1>
      <h2 className="fw-bold">{stats.totalTemples}</h2>
      <p>Temples</p>
    </div>
  </div>
</div>

<div className="col-md-3 mb-4">
  <div className="card shadow border-0">
    <div className="card-body">
      <h1>🎫</h1>
      <h2 className="fw-bold">{stats.totalBookings}</h2>
      <p>Bookings</p>
    </div>
  </div>
</div>

<div className="col-md-3 mb-4">
  <div className="card shadow border-0">
    <div className="card-body">
      <h1>👥</h1>
      <h2 className="fw-bold">{stats.totalUsers}</h2>
      <p>Registered Users</p>
    </div>
  </div>
</div>

<div className="col-md-3 mb-4">
  <div className="card shadow border-0">
    <div className="card-body">
      <h1>📅</h1>
      <h2 className="fw-bold">{stats.totalSlots}</h2>
      <p>Available Slots</p>
    </div>
  </div>
</div>
          </div>

        </div>
      </section>
      {/* Featured Temples */}

<section className="py-5">
  <div className="container">

    <h2 className="text-center fw-bold mb-5">
      Popular Temples
    </h2>

    <div className="row">

      {featuredTemples.map((temple) => (

        <div
          className="col-lg-4 col-md-6 mb-4"
          key={temple._id}
        >

          <div className="card shadow h-100 border-0">

            <img
  src={
    temple.images?.length
      ? temple.images[0]
      : "https://via.placeholder.com/600x400?text=Temple"
  }
  className="card-img-top"
  alt={temple.name}
  style={{
    height: "240px",
    objectFit: "cover",
  }}
/>

            <div className="card-body">

              <h5 className="fw-bold">
                {temple.name}
              </h5>

              <p className="text-muted">
                📍 {temple.city}, {temple.state}
              </p>

              <p>
  {temple.description
    ? temple.description.substring(0, 120) + "..."
    : "No description available."}
</p>

            </div>

            <div className="card-footer bg-white border-0">

              <Link
                to={`/temple/${temple._id}`}
                className="btn btn-primary w-100"
              >
                View Details
              </Link>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>
</section>

{/* How It Works */}
<section className="py-5 bg-light">
  <div className="container">

    <h2 className="text-center fw-bold mb-5">
      How It Works
    </h2>

    <div className="row text-center">

      <div className="col-md-3 mb-4">
        <div className="card border-0 shadow h-100">
          <div className="card-body">
            <h1>📝</h1>
            <h4>Register</h4>
            <p>
              Create your DarshanEase account in just a few steps.
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-4">
        <div className="card border-0 shadow h-100">
          <div className="card-body">
            <h1>🛕</h1>
            <h4>Select Temple</h4>
            <p>
              Browse temples and choose the one you want to visit.
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-4">
        <div className="card border-0 shadow h-100">
          <div className="card-body">
            <h1>📅</h1>
            <h4>Choose Slot</h4>
            <p>
              Pick your preferred darshan date and time slot.
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-4">
        <div className="card border-0 shadow h-100">
          <div className="card-body">
            <h1>🙏</h1>
            <h4>Book Darshan</h4>
            <p>
              Confirm your booking and receive instant confirmation.
            </p>
          </div>
        </div>
      </div>

    </div>

  </div>
</section>

      {/* Features */}
      <section className="py-5">
        <div className="container">

          <h2 className="text-center mb-5 fw-bold">
            Why Choose DarshanEase?
          </h2>

          <div className="row">

            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow text-center">
                <div className="card-body">
                  <h1>⚡</h1>
                  <h4>Fast Booking</h4>
                  <p>
                    Reserve your darshan slot within
                    minutes without standing in queues.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow text-center">
                <div className="card-body">
                  <h1>🔒</h1>
                  <h4>Secure Platform</h4>
                  <p>
                    Your bookings and personal information
                    are handled securely.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow text-center">
                <div className="card-body">
                  <h1>📱</h1>
                  <h4>Easy to Use</h4>
                  <p>
                    Simple interface designed for devotees
                    of all age groups.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">

          <h2 className="fw-bold">
            Begin Your Spiritual Journey Today
          </h2>

          <p className="mt-3">
            Discover temples, select your preferred slot,
            and complete your booking in minutes.
          </p>

          <Link
            to="/temples"
            className="btn btn-warning btn-lg mt-3"
          >
            Book Darshan Now
          </Link>

        </div>
      </section>
    </>
  );
}

export default Home;
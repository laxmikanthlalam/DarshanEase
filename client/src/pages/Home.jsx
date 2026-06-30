import { Link } from "react-router-dom";

function Home() {
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

            <Link
              to="/register"
              className="btn btn-outline-light btn-lg"
            >
              Get Started
            </Link>
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
                  <h2 className="fw-bold">150+</h2>
                  <p>Temples</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h1>🎫</h1>
                  <h2 className="fw-bold">10K+</h2>
                  <p>Bookings</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h1>😊</h1>
                  <h2 className="fw-bold">5K+</h2>
                  <p>Happy Devotees</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h1>⏰</h1>
                  <h2 className="fw-bold">24×7</h2>
                  <p>Online Booking</p>
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
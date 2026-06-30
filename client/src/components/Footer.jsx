import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-5 pb-3">
      <div className="container">

        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h4>🛕 DarshanEase</h4>

            <p>
              DarshanEase is an online temple darshan
              booking platform that allows devotees to
              reserve darshan slots conveniently without
              waiting in long queues.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">

            <h5>Quick Links</h5>

            <ul className="list-unstyled">

              <li>
                <a
                  href="/"
                  className="text-white text-decoration-none"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/temples"
                  className="text-white text-decoration-none"
                >
                  Temples
                </a>
              </li>

              <li>
                <a
                  href="/bookings"
                  className="text-white text-decoration-none"
                >
                  My Bookings
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">

            <h5>Contact</h5>

            <p>📧 support@darshanease.com</p>

            <p>📞 +91 9876543210</p>

            <div className="fs-4">

              <FaFacebook className="me-3" />

              <FaInstagram className="me-3" />

              <FaTwitter className="me-3" />

              <FaGithub />

            </div>

          </div>

        </div>

        <hr />

        <div className="text-center">

          © {new Date().getFullYear()} DarshanEase.
          All Rights Reserved.

        </div>

      </div>
    </footer>
  );
}

export default Footer;
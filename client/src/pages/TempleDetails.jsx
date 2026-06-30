import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function TempleDetails() {
  const { id } = useParams();

  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchTemple();
    fetchSlots();
  }, []);

  const fetchTemple = async () => {
    try {
      const response = await api.get(`/temples/${id}`);
      setTemple(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await api.get(`/slots/temple/${id}`);
      setSlots(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!temple) {
    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      {/* Temple Details */}
      {/* Temple Details */}

<div className="card shadow-lg border-0 mb-5">
  <div className="row g-0">

    <div className="col-lg-5">

      <img
  src={
    temple.images?.length
      ? temple.images[0]
      : "https://via.placeholder.com/600x400?text=Temple"
  }
  alt={temple.name}
  className="img-fluid rounded-start"
  style={{
    height: "100%",
    minHeight: "420px",
    objectFit: "cover",
  }}
/>

    </div>

    <div className="col-lg-7">

      <div className="card-body p-4">

        <h2 className="fw-bold mb-3">
          {temple.name}
        </h2>

        <p>
          <strong>🛕 Deity:</strong> {temple.deity}
        </p>

        <p>
          <strong>📍 Location:</strong>{" "}
          {temple.city}, {temple.state}
        </p>

        <p>
          <strong>🏠 Address:</strong>{" "}
          {temple.address}
        </p>

        <p>
          <strong>🕘 Opening:</strong>{" "}
          {temple.openingTime}
        </p>

        <p>
          <strong>🌙 Closing:</strong>{" "}
          {temple.closingTime}
        </p>

        <p>
          <strong>📞 Contact:</strong>{" "}
          {temple.contactNumber}
        </p>

        <hr />

        <h5>About Temple</h5>

        <p className="text-muted">
          {temple.description}
        </p>

      </div>

    </div>

  </div>
</div>

      {/* Slots */}
      <div className="text-center mb-5">
  <h2 className="fw-bold">
    Available Darshan Slots
  </h2>
  <p className="text-muted">
    Choose your preferred darshan slot and book instantly.
  </p>
</div>

      <div className="row">

        {slots.length === 0 ? (
          <p>No slots available.</p>
        ) : (
          slots.map((slot) => (
            <div className="col-md-6 mb-4" key={slot._id}>
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body">

  <span className="badge bg-primary mb-3">
    {new Date(slot.date).toLocaleDateString()}
  </span>

  <h4 className="fw-bold">
    {slot.slotName}
  </h4>

  <hr />

  <p>
    🕘 <strong>Time:</strong><br />
    {slot.startTime} - {slot.endTime}
  </p>

  <p>
    💰 <strong>Price:</strong><br />
    ₹{slot.price}
  </p>

  <p>
    👥 <strong>Seats Left:</strong><br />

    <span
      className={`badge ${
        slot.availableSeats > 100
          ? "bg-success"
          : slot.availableSeats > 20
          ? "bg-warning text-dark"
          : "bg-danger"
      }`}
    >
      {slot.availableSeats}
    </span>

  </p>

  {slot.availableSeats > 0 ? (
  <Link
    to={`/booking/${slot._id}`}
    className="btn btn-success w-100"
  >
    Book Now
  </Link>
) : (
  <button
    className="btn btn-danger w-100"
    disabled
  >
    Slot Full
  </button>
)}

</div>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default TempleDetails;
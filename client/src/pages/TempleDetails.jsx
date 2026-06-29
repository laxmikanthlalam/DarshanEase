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
      <div className="card shadow mb-4">
        <div className="card-body">

          <h2>{temple.name}</h2>
          <hr />

          <p><strong>Deity:</strong> {temple.deity}</p>
          <p><strong>Location:</strong> {temple.city}, {temple.state}</p>
          <p><strong>Address:</strong> {temple.address}</p>
          <p><strong>Opening:</strong> {temple.openingTime}</p>
          <p><strong>Closing:</strong> {temple.closingTime}</p>
          <p><strong>Contact:</strong> {temple.contactNumber}</p>

          <p>{temple.description}</p>

        </div>
      </div>

      {/* Slots */}
      <h3 className="mb-3">Available Darshan Slots</h3>

      <div className="row">

        {slots.length === 0 ? (
          <p>No slots available.</p>
        ) : (
          slots.map((slot) => (
            <div className="col-md-6 mb-4" key={slot._id}>
              <div className="card shadow h-100">

                <div className="card-body">

                  <h4>{slot.slotName}</h4>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(slot.date).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {slot.startTime} - {slot.endTime}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹{slot.price}
                  </p>

                  <p>
                    <strong>Available Seats:</strong>{" "}
                    {slot.availableSeats}
                  </p>

                  <Link
                    to={`/booking/${slot._id}`}
                    className="btn btn-success"
                  >
                    Book Now
                  </Link>

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
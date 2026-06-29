import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Booking() {
  const { slotId } = useParams();
  const navigate = useNavigate();

  const [slot, setSlot] = useState(null);
  const [persons, setPersons] = useState(1);

  useEffect(() => {
    fetchSlot();
  }, []);

  const fetchSlot = async () => {
    try {
      const response = await api.get(`/slots/${slotId}`);
      setSlot(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load slot details");
    }
  };

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await api.post("/bookings", {
        user: user._id,
        temple: slot.temple._id,
        slot: slot._id,
        numberOfPersons: persons,
      });

      toast.success("Booking Successful!");

      navigate("/bookings");
    } catch (error) {
      console.log(error);
      console.log(error.response);

      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  if (!slot) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2>{slot.slotName}</h2>

          <hr />

          <p>
            <strong>Temple:</strong> {slot.temple.name}
          </p>

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

          <div className="mb-3">
            <label className="form-label">
              Number of Persons
            </label>

            <input
              type="number"
              className="form-control"
              min="1"
              max={slot.availableSeats}
              value={persons}
              onChange={(e) =>
                setPersons(Number(e.target.value))
              }
            />
          </div>

          <h4>
            Total Amount : ₹{slot.price * persons}
          </h4>

          <button
            className="btn btn-success mt-3"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booking;
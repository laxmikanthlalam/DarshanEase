import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings/my");

      console.log("Bookings:", response.data);
      console.log("API Response:", response.data);
      console.log("Bookings:", response.data.data);

      setBookings(response.data.data);
    } catch (error) {
      console.error("Fetch Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to fetch bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await api.put(`/bookings/${id}/cancel`);

      toast.success("Booking Cancelled Successfully");

      fetchBookings();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Cancellation Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <h2 className="mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="alert alert-warning">
          No Bookings Found
        </div>
      ) : (
        bookings.map((booking) => (
          <div className="card shadow mb-3" key={booking._id}>
            <div className="card-body">

              <h4>
                {booking.temple?.name || "Temple Not Found"}
              </h4>

              <p>
                <strong>Slot:</strong>{" "}
                {booking.slot?.slotName}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {booking.slot?.date
                  ? new Date(
                      booking.slot.date
                    ).toLocaleDateString()
                  : "N/A"}
              </p>

              <p>
                <strong>Persons:</strong>{" "}
                {booking.numberOfPersons}
              </p>

              <p>
                <strong>Total Amount:</strong> ₹
                {booking.totalAmount}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    booking.bookingStatus === "CONFIRMED"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {booking.bookingStatus}
                </span>
              </p>

              {booking.bookingStatus === "CONFIRMED" && (
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    cancelBooking(booking._id)
                  }
                >
                  Cancel Booking
                </button>
              )}

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import api from "../services/api";
import generateTicket from "../utils/generateTicket";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings/my");
      setBookings(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to fetch bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Your seats will be released.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      await api.put(`/bookings/${id}/cancel`);

      toast.success("Booking Cancelled Successfully");

      fetchBookings();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Cancellation Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">

      <h2 className="fw-bold mb-4">
        🎫 My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="alert alert-warning">
          No Bookings Found
        </div>
      ) : (
        <div className="row">

          {bookings.map((booking) => (

            <div
              className="col-lg-6 mb-4"
              key={booking._id}
            >

              <div className="card shadow-lg border-0 h-100">

                <div className="card-header bg-primary text-white">

                  <h5 className="mb-0">
                    🛕 {booking.temple?.name}
                  </h5>

                </div>

                <div className="card-body">

                  <p>
                    <strong>Booking ID:</strong><br />
                    {booking._id}
                  </p>

                  <p>
                    <strong>Darshan Slot:</strong><br />
                    {booking.slot?.slotName}
                  </p>

                  <p>
                    <strong>Date:</strong><br />
                    {booking.slot?.date
                      ? new Date(
                          booking.slot.date
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p>
                    <strong>Persons:</strong><br />
                    {booking.numberOfPersons}
                  </p>

                  <p>
                    <strong>Total Amount:</strong><br />
                    ₹{booking.totalAmount}
                  </p>

                  <div className="mb-3">

                    <strong>Booking Status</strong>

                    <br />

                    <span
                      className={`badge ${
                        booking.bookingStatus ===
                        "CONFIRMED"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>

                  </div>

                  <div className="mb-3">

                    <strong>Payment Status</strong>

                    <br />

                    <span
                      className={`badge ${
                        booking.paymentStatus ===
                        "PAID"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>

                  </div>

                  {booking.bookingStatus === "CONFIRMED" && (
  <>
    <button
      className="btn btn-primary w-100 mb-2"
      onClick={() => generateTicket(booking)}
    >
      📄 Download Ticket
    </button>

    <button
      className="btn btn-danger w-100"
      onClick={() => cancelBooking(booking._id)}
    >
      Cancel Booking
    </button>
  </>
)}

                </div>

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}

export default MyBookings;
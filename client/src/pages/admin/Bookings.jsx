import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import api from "../../services/api";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings");
      setBookings(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch bookings");
    }
  };

  const cancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "This booking will be cancelled.",
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
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to cancel booking"
      );
    }
  };

  const deleteBooking = async (id) => {
    const result = await Swal.fire({
      title: "Delete Booking?",
      text: "This booking will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/bookings/${id}`);

      toast.success("Booking Deleted Successfully");

      fetchBookings();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete booking"
      );
    }
  };

  return (
    <div className="container-fluid">

      <h2 className="mb-4">Booking Management</h2>

      <table className="table table-bordered table-hover align-middle">

        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Temple</th>
            <th>Slot</th>
            <th>Date</th>
            <th>Persons</th>
            <th>Total</th>
            <th>Booking</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {bookings.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center">
                No Bookings Found
              </td>
            </tr>
          ) : (
            bookings.map((booking, index) => (
              <tr key={booking._id}>

                <td className="text-center">
                  {index + 1}
                </td>

                <td>
                  {booking.user?.fullName || "Unknown User"}
                </td>

                <td>
                  {booking.temple?.name || "Temple Deleted"}
                </td>

                <td>
                  {booking.slot?.slotName || "-"}
                </td>

                <td className="text-center">
                  {booking.slot?.date
                    ? new Date(
                        booking.slot.date
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="text-center">
                  {booking.numberOfPersons}
                </td>

                <td className="text-center">
                  ₹{booking.totalAmount}
                </td>

                <td className="text-center">
                  <span
                    className={`badge ${
                      booking.bookingStatus === "CONFIRMED"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </td>

                <td className="text-center">
                  <span
                    className={`badge ${
                      booking.paymentStatus === "PAID"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>

                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">

                    {booking.bookingStatus !==
                      "CANCELLED" && (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          cancelBooking(booking._id)
                        }
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteBooking(booking._id)
                      }
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Bookings;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import api from "../../services/api";

function Slots() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await api.get("/slots");
      setSlots(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch slots");
    }
  };

  const deleteSlot = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this slot!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/slots/${id}`);

      await Swal.fire({
        title: "Deleted!",
        text: "Slot deleted successfully.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });

      fetchSlots();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete slot"
      );
    }
  };

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Slot Management</h2>

        <Link
          to="/admin/add-slot"
          className="btn btn-success"
        >
          + Add Slot
        </Link>
      </div>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Temple</th>
            <th>Slot</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {slots.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No Slots Found
              </td>
            </tr>
          ) : (
            slots.map((slot, index) => (
              <tr key={slot._id}>
                <td>{index + 1}</td>

                <td>{slot.temple?.name}</td>

                <td>{slot.slotName}</td>

                <td>
                  {new Date(slot.date).toLocaleDateString()}
                </td>

                <td>
                  {slot.startTime} - {slot.endTime}
                </td>

                <td>₹{slot.price}</td>

                <td>{slot.availableSeats}</td>

                <td>
                  <Link
                    to={`/admin/edit-slot/${slot._id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteSlot(slot._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Slots;
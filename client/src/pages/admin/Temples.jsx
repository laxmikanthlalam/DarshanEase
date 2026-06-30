import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import api from "../../services/api";

function Temples() {
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const response = await api.get("/temples");
      setTemples(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch temples");
    }
  };

  const deleteTemple = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this temple!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/temples/${id}`);

      await Swal.fire({
        title: "Deleted!",
        text: "Temple has been deleted successfully.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });

      fetchTemples();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete temple."
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Temple Management</h2>

        <Link
          to="/admin/add-temple"
          className="btn btn-success"
        >
          + Add Temple
        </Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Deity</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {temples.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No Temples Found
              </td>
            </tr>
          ) : (
            temples.map((temple, index) => (
              <tr key={temple._id}>
                <td>{index + 1}</td>
                <td>{temple.name}</td>
                <td>{temple.deity}</td>
                <td>{temple.city}</td>
                <td>{temple.state}</td>

                <td>
                  <Link
                    to={`/admin/edit-temple/${temple._id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTemple(temple._id)}
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

export default Temples;
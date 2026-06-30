import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

function EditSlot() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);

  const [formData, setFormData] = useState({
    temple: "",
    slotName: "",
    date: "",
    startTime: "",
    endTime: "",
    price: "",
    capacity: "",
    availableSeats: "",
  });

  useEffect(() => {
    fetchTemples();
    fetchSlot();
  }, []);

  const fetchTemples = async () => {
    try {
      const response = await api.get("/temples");
      setTemples(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load temples");
    }
  };

  const fetchSlot = async () => {
    try {
      const response = await api.get(`/slots/${id}`);

      const slot = response.data.data;

      setFormData({
        temple: slot.temple?._id || "",
        slotName: slot.slotName,
        date: slot.date.split("T")[0],
        startTime: slot.startTime,
        endTime: slot.endTime,
        price: slot.price,
        capacity: slot.capacity,
        availableSeats: slot.availableSeats,
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to load slot");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/slots/${id}`, {
        ...formData,
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        availableSeats: Number(formData.availableSeats),
      });

      toast.success("Slot Updated Successfully");

      navigate("/admin/slots");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update slot"
      );
    }
  };

  return (
    <div className="container">

      <div className="card shadow">

        <div className="card-body">

          <h2 className="mb-4">Edit Slot</h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Temple</label>

              <select
                className="form-select"
                name="temple"
                value={formData.temple}
                onChange={handleChange}
                required
              >
                <option value="">Select Temple</option>

                {temples.map((temple) => (
                  <option
                    key={temple._id}
                    value={temple._id}
                  >
                    {temple.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Slot Name</label>

              <input
                type="text"
                className="form-control"
                name="slotName"
                value={formData.slotName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Date</label>

              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Start Time</label>

                <input
                  type="time"
                  className="form-control"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>End Time</label>

                <input
                  type="time"
                  className="form-control"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="row">

              <div className="col-md-4 mb-3">
                <label>Price</label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Capacity</label>

                <input
                  type="number"
                  className="form-control"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Available Seats</label>

                <input
                  type="number"
                  className="form-control"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <button className="btn btn-primary">
              Update Slot
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditSlot;
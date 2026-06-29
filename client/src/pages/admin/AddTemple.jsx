import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddTemple() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    deity: "",
    state: "",
    city: "",
    address: "",
    description: "",
    openingTime: "",
    closingTime: "",
    contactNumber: "",
    images: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const templeData = {
        ...formData,
        images: formData.images
          ? [formData.images]
          : [],
      };

      await api.post("/temples", templeData);

      alert("Temple Added Successfully");

      navigate("/admin/temples");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Unable to Add Temple"
      );
    }
  };

  return (
    <div className="container">

      <div className="card shadow">

        <div className="card-body">

          <h2 className="mb-4">Add Temple</h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Temple Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Deity</label>
              <input
                type="text"
                className="form-control"
                name="deity"
                value={formData.deity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Description</label>
              <textarea
                rows="4"
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Opening Time</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="03:00 AM"
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Closing Time</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="11:30 PM"
                  name="closingTime"
                  value={formData.closingTime}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="mb-3">
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label>Image URL (Optional)</label>
              <input
                type="text"
                className="form-control"
                name="images"
                value={formData.images}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success">
              Add Temple
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddTemple;
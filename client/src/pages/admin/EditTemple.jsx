import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

function EditTemple() {
  const { id } = useParams();
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

  useEffect(() => {
    fetchTemple();
  }, []);

  const fetchTemple = async () => {
    try {
      const response = await api.get(`/temples/${id}`);

      const temple = response.data.data;

      setFormData({
        name: temple.name,
        deity: temple.deity,
        state: temple.state,
        city: temple.city,
        address: temple.address,
        description: temple.description,
        openingTime: temple.openingTime,
        closingTime: temple.closingTime,
        contactNumber: temple.contactNumber,
        images: temple.images?.length ? temple.images[0] : "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to load temple");
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
      await api.put(`/temples/${id}`, {
        ...formData,
        images: formData.images ? [formData.images] : [],
      });

      toast.success("Temple Updated Successfully");

      navigate("/admin/temples");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to Update Temple"
      );
    }
  };

  return (
    <div className="container">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="mb-4">Edit Temple</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Temple Name</label>
              <input
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
                  className="form-control"
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Closing Time</label>
                <input
                  className="form-control"
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
                className="form-control"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label>Image URL</label>
              <input
                className="form-control"
                name="images"
                value={formData.images}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary">
              Update Temple
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTemple;
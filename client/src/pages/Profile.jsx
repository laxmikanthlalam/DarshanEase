import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setUser(response.data.data);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/users/profile", {
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
      });

      setUser(response.data.data);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data)
      );

      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Profile Update Failed"
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
    <div className="container my-5">

      <div className="row justify-content-center">

        <div className="col-md-7">

          <div className="card shadow-lg">

            <div className="card-header bg-primary text-white">

              <h3 className="mb-0">
                👤 My Profile
              </h3>

            </div>

            <div className="card-body">

              <form onSubmit={updateProfile}>

                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={user.fullName}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        fullName: e.target.value,
                      })
                    }
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={user.email}
                    disabled
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={user.phoneNumber || ""}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        phoneNumber: e.target.value,
                      })
                    }
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Role
                  </label>

                  <input
                    className="form-control"
                    value={user.role}
                    disabled
                  />

                </div>

                <button
                  className="btn btn-success w-100"
                >
                  Save Changes
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
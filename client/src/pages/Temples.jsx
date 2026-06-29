import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Temples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const response = await api.get("/temples");
      setTemples(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      <h2 className="mb-4">All Temples</h2>

      <div className="row">
        {temples.map((temple) => (
          <div className="col-md-4 mb-4" key={temple._id}>
            <div className="card h-100 shadow">

              <img
                src={
                  temple.images && temple.images.length > 0
                    ? temple.images[0]
                    : "https://via.placeholder.com/400x250?text=Temple+Image"
                }
                alt={temple.name}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">

                <h4>{temple.name}</h4>

                <p>
                  <strong>Deity:</strong> {temple.deity}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {temple.city}, {temple.state}
                </p>

                <p>{temple.description}</p>

                <Link
                  to={`/temple/${temple._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Temples;
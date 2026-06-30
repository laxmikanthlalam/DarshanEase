import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Temples() {
  const [temples, setTemples] = useState([]);
const [filteredTemples, setFilteredTemples] = useState([]);

const [search, setSearch] = useState("");
const [stateFilter, setStateFilter] = useState("");
const [cityFilter, setCityFilter] = useState("");

const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const response = await api.get("/temples");
      setTemples(response.data.data);
      setFilteredTemples(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
   
  useEffect(() => {
  let filtered = temples;

  if (search) {
    filtered = filtered.filter((temple) =>
      temple.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  if (stateFilter) {
    filtered = filtered.filter(
      (temple) => temple.state === stateFilter
    );
  }

  if (cityFilter) {
    filtered = filtered.filter(
      (temple) => temple.city === cityFilter
    );
  }

  setFilteredTemples(filtered);
}, [search, stateFilter, cityFilter, temples]);

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

      <div className="row mb-4">

  <div className="col-md-4 mb-2">
    <input
      type="text"
      className="form-control"
      placeholder="🔍 Search Temple..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <div className="col-md-4 mb-2">
    <select
      className="form-select"
      value={stateFilter}
      onChange={(e) => {
        setStateFilter(e.target.value);
        setCityFilter("");
      }}
    >
      <option value="">All States</option>

      {[...new Set(temples.map((t) => t.state))].map(
        (state) => (
          <option key={state} value={state}>
            {state}
          </option>
        )
      )}
    </select>
  </div>

  <div className="col-md-4 mb-2">
    <select
      className="form-select"
      value={cityFilter}
      onChange={(e) => setCityFilter(e.target.value)}
    >
      <option value="">All Cities</option>

      {[
        ...new Set(
          temples
            .filter(
              (t) =>
                !stateFilter ||
                t.state === stateFilter
            )
            .map((t) => t.city)
        ),
      ].map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>

</div>

      <div className="row">

  {filteredTemples.length === 0 ? (
    <div className="col-12">
      <div className="alert alert-warning">
        No temples found.
      </div>
    </div>
  ) : (
    filteredTemples.map((temple) => (
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
        ))
      )}
      </div>
    </div>
  );
}

export default Temples;
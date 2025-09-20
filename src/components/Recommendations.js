
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const response = await axios.get(`${BASE_URL}/api/recommendations/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.recommended_products) {
          setRecommendations(response.data.recommended_products);
        } else {
          setRecommendations([]);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching recommendations.");
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (recommendations.length === 0) {
    return <p>No recommendations available at the moment.</p>;
  }

  return (
    <div>
      <h1>Recommended for You</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {recommendations.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              maxWidth: "300px",
            }}
          >
            <img
              src={product.image_url || "/default-placeholder.jpg"} // Handle missing image URLs
              alt={product.title || "Product Image"}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px 8px 0 0",
              }}
              onError={(e) => {
                console.error(`Failed to load image: ${product.image_url}`);
                e.target.src = "/default-placeholder.jpg";
              }}
            />
            <h5>{product.title}</h5>
            <p>Price: ₹{product.price || "N/A"}</p>
            <Link
              to={`/product/detail/${product.id}`} // Navigate to the product page
              style={{
                display: "block",
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                textAlign: "center",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;

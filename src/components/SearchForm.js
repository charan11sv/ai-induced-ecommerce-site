import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SearchForm.css";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let body;
      if (image) {
        const formData = new FormData();
        formData.append("query", query);
        formData.append("image", image);
        body = formData;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({ query });
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/chats/search-product/",
        {
          method: "POST",
          headers,
          body,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Search failed.");
      }

      const data = await response.json();

      if (Array.isArray(data.results)) {
        setResults(data.results);
      } else if (data.results.llm_based_results || data.results.keyword_based_results) {
        const combinedResults = [
          ...(data.results.llm_based_results || []),
          ...(data.results.keyword_based_results || []),
        ];
        setResults(combinedResults);
      } else {
        setResults([]);
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  };

  const renderResults = () => {
    if (results.length === 0) {
      return (
        <p className="no-results">
          
        </p>
      );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentResults = results.slice(startIndex, endIndex);

    return (
      <>
        <div className="results-container">
          {currentResults.map((product) => (
            <div className="result-card" key={product.id}>
              <img
                src={product.image_url || "/default-placeholder.jpg"}
                alt={product.title || "Product Image"}
                className="result-image"
                onError={(e) => {
                  e.target.src = "/default-placeholder.jpg";
                }}
              />
              <h5>{product.title}</h5>
              <p>Price: ₹{product.price || "N/A"}</p>
              <Link to={`/product/detail/${product.id}`} className="view-product-btn">
                View Product
              </Link>
            </div>
          ))}
        </div>
        <div className="pagination-container">
          <div className="pagination">
            {Array.from({ length: Math.ceil(results.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={`search-form ${results.length > 0 ? "results-mode" : ""}`}>
      <h1>Welcome to AI-Powered Shopping</h1>
      <p className="subtext">
        Experience GPT-powered recommendations for smarter, faster shopping.
      </p>
      <div className="search-section">
        <div className="search-box-container">
          <h3>Text Search</h3>
          <p className="description">
            Use the text box to search for products with keywords.
          </p>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="search-input"
            />
          </form>
        </div>
        <div className="image-upload-container">
          <h3>Image Search</h3>
          <p className="description">
            Upload an image to search for similar products.
          </p>
          <label className="file-upload">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="file-input"
            />
            Choose File
          </label>
          {image && (
            <div className="uploaded-image">
              Uploaded Image: {image.name}
              <button className="remove-btn" onClick={() => setImage(null)}>
                Remove Image
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="search-btn"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p className="error-message">{error}</p>}
      {renderResults()}
    </div>
  );
}

export default SearchForm;

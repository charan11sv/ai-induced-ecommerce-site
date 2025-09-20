// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ProductChat from "../components/ProductChat";

// const ProductPage = () => {
//   const { id: productId } = useParams(); // Extract productId from URL params
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const BASE_URL =
//       process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

//     const fetchProduct = async () => {
//       try {
//         console.log("Fetching product with ID:", productId);

//         const token = localStorage.getItem("token"); // Get token from localStorage
//         if (!token) {
//           console.error("Authentication token not found.");
//           throw new Error("Authentication token not found. Please log in.");
//         }

//         console.log("Token retrieved successfully. Making API call...");

//         const response = await axios.get(
//           `${BASE_URL}/api/products/detail/${productId}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include token in the Authorization header
//             },
//           }
//         );

//         console.log("Product data fetched from API:", response.data);

//         if (response.data && response.data.product_details) {
//           console.log("Product details retrieved:", response.data.product_details);
//           setProduct(response.data.product_details);
//         } else {
//           console.warn("No product details found in the response.");
//           setProduct(null);
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//         setError("Failed to fetch product details. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   const handleAddToCart = async () => {
//     try {
//       const BASE_URL =
//         process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("You need to log in to add items to your cart.");
//         return;
//       }

//       const response = await axios.post(
//         `${BASE_URL}/api/users/cart/add/${productId}/`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include token in Authorization header
//           },
//         }
//       );

//       alert(response.data.message || `${product.title} has been added to your cart.`);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add to cart. Please try again.");
//     }
//   };

//   const handleBuyNow = () => {
//     alert("Buy Now functionality is under development.");
//   };

//   if (loading) {
//     return <p>Loading product details...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!product) {
//     return <p>Product not found.</p>;
//   }

//   return (
//     <div className="product-page">
//       <h1>{product.title || "No Title Available"}</h1>
//       <p>{product.description || "No description available."}</p>
//       <p>
//         <strong>Price:</strong> ₹{product.price ? product.price : "Price not available"}
//       </p>
//       <p>
//         <strong>Category:</strong> {product.category ? product.category : "Category not specified"}
//       </p>
//       <p>
//         <strong>Stock Status:</strong>{" "}
//         {product.stock_status ? product.stock_status : "Stock status not available"}
//       </p>
//       {product.image ? (
//         <img
//           src={product.image} // Use the absolute URL from the API response
//           alt={product.title || "Product Image"}
//           style={{ maxWidth: "100%", borderRadius: "8px" }}
//           onError={(e) => {
//             console.error(`Failed to load image: ${product.image}`);
//             e.target.src = "/default-placeholder.jpg"; // Fallback to placeholder image
//           }}
//           onLoad={() => {
//             console.log(`Image loaded successfully: ${product.image}`);
//           }}
//         />
//       ) : (
//         <p>No image available for this product.</p>
//       )}

//       <div style={{ marginTop: "20px" }}>
//         <button
//           onClick={handleAddToCart}
//           style={{
//             padding: "10px 20px",
//             marginRight: "10px",
//             backgroundColor: "#007bff",
//             color: "#fff",
//             borderRadius: "4px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Add to Cart
//         </button>
//         <button
//           onClick={handleBuyNow}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#28a745",
//             color: "#fff",
//             borderRadius: "4px",
//             border: "none",
//             cursor: "not-allowed",
//             opacity: "0.7",
//           }}
//           disabled
//         >
//           Buy Now
//         </button>
//       </div>

//       <ProductChat productId={productId} />
//     </div>
//   );
// };

// export default ProductPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ProductChat from "../components/ProductChat";
// import "../styles/ProductPage.css"; // Import a CSS file for styling

// const ProductPage = () => {
//   const { id: productId } = useParams(); // Extract productId from URL params
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const BASE_URL =
//       process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

//     const fetchProduct = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Authentication token not found. Please log in.");
//         }

//         const response = await axios.get(
//           `${BASE_URL}/api/products/detail/${productId}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include token in the Authorization header
//             },
//           }
//         );

//         if (response.data && response.data.product_details) {
//           setProduct(response.data.product_details);
//         } else {
//           setProduct(null);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//         setError("Failed to fetch product details. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   const handleAddToCart = async () => {
//     try {
//       const BASE_URL =
//         process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("You need to log in to add items to your cart.");
//         return;
//       }

//       const response = await axios.post(
//         `${BASE_URL}/api/users/cart/add/${productId}/`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert(response.data.message || `${product.title} has been added to your cart.`);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add to cart. Please try again.");
//     }
//   };

//   const handleBuyNow = () => {
//     alert("Buy Now functionality is under development.");
//   };

//   if (loading) {
//     return <p>Loading product details...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!product) {
//     return <p>Product not found.</p>;
//   }

//   return (
//     <div className="product-page">
//       <div className="product-container">
//         <div className="product-image-container">
//           {product.image ? (
//             <img
//               src={product.image} // Use the absolute URL from the API response
//               alt={product.title || "Product Image"}
//               className="product-image"
//               onError={(e) => {
//                 e.target.src = "/default-placeholder.jpg"; // Fallback to placeholder image
//               }}
//             />
//           ) : (
//             <p className="no-image">No image available for this product.</p>
//           )}
//         </div>

//         <div className="product-details">
//           <h1 className="product-title">{product.title || "No Title Available"}</h1>
//           <p className="product-description">
//             {product.description || "No description available."}
//           </p>
//           <p className="product-info">
//             <strong>Price:</strong> ₹{product.price || "Price not available"}
//           </p>
//           <p className="product-info">
//             <strong>Category:</strong> {product.category || "Category not specified"}
//           </p>
//           <p className="product-info">
//             <strong>Stock Status:</strong>{" "}
//             {product.stock_status || "Stock status not available"}
//           </p>
//           {product.specs && (
//             <div className="product-specs">
//               <h3>Specifications:</h3>
//               <pre>{product.specs}</pre>
//             </div>
//           )}
//           <div className="button-container">
//             <button className="add-to-cart-btn" onClick={handleAddToCart}>
//               Add to Cart
//             </button>
//             <button className="buy-now-btn" onClick={handleBuyNow} disabled>
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="chat-section">
//         <ProductChat productId={productId} />
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductPage.css"; // Import CSS file for styling

const ProductPage = () => {
  const { id: productId } = useParams(); // Extract productId from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatQuery, setChatQuery] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [chatResponse, setChatResponse] = useState(null);

  useEffect(() => {
    const BASE_URL =
      process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const response = await axios.get(
          `${BASE_URL}/api/products/detail/${productId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.product_details) {
          setProduct(response.data.product_details);
        } else {
          setProduct(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to fetch product details. Please try again.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const BASE_URL =
        process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You need to log in to add items to your cart.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/api/users/cart/add/${productId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || `${product.title} has been added to your cart.`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const handleBuyNow = () => {
    alert("Buy Now functionality is under development.");
  };

  const handleChatSubmit = async () => {
    if (!chatQuery && !uploadedImage) {
      alert("Please enter a query or upload an image.");
      return;
    }

    try {
      const BASE_URL =
        process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You need to log in to submit a query.");
        return;
      }

      const formData = new FormData();
      formData.append("query", chatQuery);
      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }

      const response = await axios.post(
        `${BASE_URL}/api/products/${productId}/chat/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.response) {
        setChatResponse(response.data.response);
      } else {
        setChatResponse("No response from the server.");
      }
    } catch (error) {
      console.error("Error submitting chat query:", error);
      setChatResponse("Failed to submit query. Please try again.");
    }
  };

  const handleChatReset = () => {
    setChatQuery("");
    setUploadedImage(null);
    setChatResponse(null);
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-page">
      <div className="product-header">
        {/* Left: Product Image */}
        <div className="product-image-container">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title || "Product Image"}
              className="product-image"
              onError={(e) => {
                e.target.src = "/default-placeholder.jpg";
              }}
            />
          ) : (
            <p className="no-image">No image available.</p>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="product-basic-details">
          <h1 className="product-title">{product.title || "No Title Available"}</h1>
          <p className="product-info">
            <strong>Price:</strong> ₹{product.price || "Not available"}
          </p>
          <p className="product-info">
            <strong>Category:</strong> {product.category || "Not specified"}
          </p>
          <p className="product-info">
            <strong>Stock Status:</strong> {product.stock_status || "Unavailable"}
          </p>
          <div className="button-container">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow} disabled>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="product-about">
        <h2>About this Product</h2>
        <p>{product.description || "No description available."}</p>
      </div>

      {/* Specs Section */}
      {product.specs && (
        <div className="product-specs">
          <h2>Specifications</h2>
          <pre>{product.specs}</pre>
        </div>
      )}

      {/* Chat Section */}
      <div className="chat-section">
        <h2>Ask a question about this product</h2>
        <p>Have queries about this product? Let us help you!</p>
        <div className="chat-box">
          <textarea
            className="chat-textarea"
            placeholder="Type your question here..."
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
          ></textarea>
          <label className="file-upload">
            <input
              type="file"
              onChange={(e) => setUploadedImage(e.target.files[0])}
            />
            {uploadedImage ? `Uploaded: ${uploadedImage.name}` : "Upload Image"}
          </label>
          {uploadedImage && (
            <button
              className="remove-upload-btn"
              onClick={() => setUploadedImage(null)}
            >
              Remove Image
            </button>
          )}
          <div className="chat-buttons">
            <button className="chat-submit-btn" onClick={handleChatSubmit}>
              Ask
            </button>
            <button className="chat-reset-btn" onClick={handleChatReset}>
              Reset
            </button>
          </div>
          {chatResponse && (
            <p className="chat-response">
              <strong>GPT's Answer:</strong> """<em>{chatResponse}</em>"""
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductPage;


// {/* Chat Section */}
// <div className="chat-section">
// <h2>Ask a question about this product</h2>
// <p>Have queries about this product? Let us help you!</p>
// <div className="chat-box">
//   <textarea
//     className="chat-textarea"
//     placeholder="Type your question here..."
//     value={chatQuery}
//     onChange={(e) => setChatQuery(e.target.value)}
//   ></textarea>
//   <label className="file-upload">
//     <input
//       type="file"
//       onChange={(e) => setUploadedImage(e.target.files[0])}
//     />
//     {uploadedImage ? `Uploaded: ${uploadedImage.name}` : "Upload Image"}
//   </label>
//   {uploadedImage && (
//     <button
//       className="remove-upload-btn"
//       onClick={() => setUploadedImage(null)}
//     >
//       Remove Image
//     </button>
//   )}
//   <div className="chat-buttons">
//     <button className="chat-submit-btn" onClick={handleChatSubmit}>
//       Ask
//     </button>
//     <button className="chat-reset-btn" onClick={handleChatReset}>
//       Reset
//     </button>
//   </div>
//   {chatResponse && <p className="chat-response">{chatResponse}</p>}
// </div>
// </div>
// </div>
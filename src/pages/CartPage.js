// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCart = async () => {
//       const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           setError("You need to log in to view your cart.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${BASE_URL}/api/users/cart/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setCartItems(response.data.cart_items || []);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//         setError("Failed to fetch cart. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   if (loading) {
//     return <p>Loading cart...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (cartItems.length === 0) {
//     return <p>Your cart is empty.</p>;
//   }

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {cartItems.map((item) => (
//           <div
//             key={item.id}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               padding: "10px",
//               maxWidth: "300px",
//             }}
//           >
//             <img
//               src={item.image_url || "/default-placeholder.jpg"}
//               alt={item.title || "Product Image"}
//               style={{
//                 width: "100%",
//                 height: "200px",
//                 objectFit: "cover",
//                 borderRadius: "8px 8px 0 0",
//               }}
//               onError={(e) => {
//                 console.error(`Failed to load image: ${item.image_url}`);
//                 e.target.src = "/default-placeholder.jpg";
//               }}
//             />
//             <h5>{item.title}</h5>
//             <p>Price: ₹{item.price || "N/A"}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const BASE_URL =
        process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You need to log in to view your cart.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/users/cart/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cartData = response.data.cart_items || [];
        setCartItems(cartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to fetch cart. Please try again.");
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleDelete = async (productId) => {
    const BASE_URL =
      process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      // Call API to remove product from cart
      const response = await axios.post(
        `${BASE_URL}/api/users/cart/remove/${productId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update cart items in frontend state
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== productId)
        );
        alert(response.data.message); // Show success message
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {cartItems.map((item) => {
          const imageUrl = item.image_url?.startsWith("http")
            ? item.image_url
            : `http://127.0.0.1:8000${item.image_url}`;

          return (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                maxWidth: "300px",
              }}
            >
              <img
                src={imageUrl || "/default-placeholder.jpg"}
                alt={item.title || "Product Image"}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px 8px 0 0",
                }}
                onError={(e) => {
                  console.error(`Failed to load image: ${imageUrl}`);
                  e.target.src = "/default-placeholder.jpg";
                }}
              />
              <h5>{item.title}</h5>
              <p>Price: ₹{item.price || "N/A"}</p>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <Link
                  to={`/product/detail/${item.id}`} // Navigate to product page
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  View Product
                </Link>
                <button
                  onClick={() => handleDelete(item.id)} // Remove item from cart
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartPage;

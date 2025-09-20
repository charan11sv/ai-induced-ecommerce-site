// // src/pages/Register.js
// import React, { useState } from 'react';
// import api from '../services/api';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [password2, setPassword2] = useState('');
//   const [email, setEmail] = useState('');
//   const [isSeller, setIsSeller] = useState(false);
//   const [isBuyer, setIsBuyer] = useState(true); // default to true if applicable
//   const [contactInfo, setContactInfo] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/users/register/', {
//         username,
//         password,
//         password2,
//         email,
//         is_seller: isSeller,
//         is_buyer: isBuyer,
//         contact_info: contactInfo,
//       });
//       console.log("Registration response:", response);
//       alert('Registration successful! You can now log in.');
//     } catch (error) {
//       console.error('Registration error:', error.response ? error.response.data : error.message);
//       alert('Registration failed. Please check your input and try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={password2}
//           onChange={(e) => setPassword2(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Contact Info"
//           value={contactInfo}
//           onChange={(e) => setContactInfo(e.target.value)}
//           required
//         />
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={isSeller}
//               onChange={(e) => setIsSeller(e.target.checked)}
//             />
//             Register as Seller
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               checked={isBuyer}
//               onChange={(e) => setIsBuyer(e.target.checked)}
//             />
//             Register as Buyer
//           </label>
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import api from "../services/api";
import "../styles/Register.css"; // CSS for styling the form

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true); // default to true if applicable
  const [contactInfo, setContactInfo] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/register/", {
        username,
        password,
        password2,
        email,
        is_seller: isSeller,
        is_buyer: isBuyer,
        contact_info: contactInfo,
      });
      console.log("Registration response:", response);
      alert("Registration successful! You can now log in.");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      alert("Registration failed. Please check your input and try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Register</h1>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <input
            type="text"
            placeholder="Contact Info"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
            className="register-input"
          />
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              />
              Register as Seller
            </label>
            <label>
              <input
                type="checkbox"
                checked={isBuyer}
                onChange={(e) => setIsBuyer(e.target.checked)}
              />
              Register as Buyer
            </label>
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

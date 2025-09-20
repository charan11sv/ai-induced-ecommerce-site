// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../redux/slices/AuthSlice';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { status, error } = useSelector((state) => state.auth);

//   const handleLogin = () => {
//     dispatch(loginUser({ username, password }));
//   };

//   useEffect(() => {
//     if (status === 'succeeded') {
//       // Clear the input fields after successful login
//       setUsername('');
//       setPassword('');
//       // Redirect after a short delay
//       setTimeout(() => navigate('/'), 2000); // Delay redirection for 2 seconds
//     }
//   }, [status, navigate]);

//   return (
//     <div>
//       <h1>Login</h1>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         aria-label="Enter username"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         aria-label="Enter password"
//       />
//       <button onClick={handleLogin} disabled={status === 'loading'}>
//         {status === 'loading' ? 'Logging in...' : 'Login'}
//       </button>

//       {/* Status messages */}
//       {status === 'loading' && <p>Loading...</p>}
//       {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
//       {status === 'succeeded' && (
//         <p style={{ color: 'green' }}>
//           Login successful! Redirecting...
//         </p>
//       )}
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/AuthSlice";
import "../styles/Login.css"; // Import a CSS file for styling

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (status === "succeeded") {
      // Clear the input fields after successful login
      setUsername("");
      setPassword("");
      // Redirect after a short delay
      setTimeout(() => navigate("/"), 2000); // Delay redirection for 2 seconds
    }
  }, [status, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Enter username"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Enter password"
          className="login-input"
        />
        <button
          onClick={handleLogin}
          disabled={status === "loading"}
          className="login-button"
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>

        {/* Status messages */}
        {status === "loading" && <p className="login-status">Loading...</p>}
        {status === "failed" && <p className="login-error">{error}</p>}
        {status === "succeeded" && (
          <p className="login-success">Login successful! Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default Login;

// // // // src/components/Navbar.js
// // // import React from 'react';
// // // import { Link } from 'react-router-dom';

// // // const Navbar = () => {
// // //   return (
// // //     <nav>
// // //       <Link to="/">Home</Link>
// // //       <Link to="/recommendations">Recommendations</Link>
// // //       <Link to="/login">Login</Link>
// // //       <Link to="/register">Register</Link>
// // //       <Link to="/cart">Cart</Link>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;

// // src/components/Navbar.js
// import React from "react";
// import { Link } from "react-router-dom";
// import '../styles/Navbar.css';


// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <Link to="/">Home</Link>
//         <Link to="/cart">Cart</Link>
//       </div>
//       <div className="nav-right">
//         <Link to="/recommendations">Recommendations</Link>
//         <Link to="/login">Login</Link>
//         <Link to="/register">Register</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Updated styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          AI Shop 🛒
        </Link>
        <Link to="/cart" className="nav-link">
          Cart
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/recommendations" className="nav-link">
          Recommendations
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

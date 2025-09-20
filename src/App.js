// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from "./pages/CartPage";
import ProductPage from './pages/ProductPage';
import RecommendationsPage from './pages/RecommendationsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/detail/:id" element={<ProductPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CartPage from "./pages/CartPage";
// import ProductPage from "./pages/ProductPage";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/product/:id" element={<ProductPage />} />
//         {/* Other routes */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


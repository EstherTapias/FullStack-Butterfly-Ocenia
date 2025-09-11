import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Cierra el menú cuando cambia de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? "active-link nav-link" : "nav-link";
  };

  return (
    <nav className="navbar scrolled">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logotipo-navbar.png" alt="Logo Móvil" className="logo-mobile" />
          <img src="/logo-navbar.png" alt="Logo Desktop" className="logo-desktop" />
          <span className="logo-text">POLINIZADORAS | Mariposas Oceania</span>
        </Link>

        <button
          className="menu-button"
          onClick={handleToggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul
          className={`navbar-links ${isMenuOpen ? "menu-open" : ""}`}
          aria-expanded={isMenuOpen}
        >
          
          <li><Link to="/butterflylist" className={getLinkClass("/explora")}>Explora</Link></li>
          <li><Link to="/newbutterfly" className={getLinkClass("/añadir")}>Añadir Mariposa</Link></li>
          <li><Link to="/contactcreators" className={getLinkClass("/")}>Quiénes Somos</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">
        Proyecto colaborativo desarrollado por 5 coders del bootcamp FemCoders de

        <a href="https://factoriaf5.org" target="_blank" rel="noopener noreferrer">
          {' '} Factoría F5.          
        </a>
        © [2025] Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;

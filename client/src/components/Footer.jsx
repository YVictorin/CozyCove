import React from "react";
import { ChevronUp } from "lucide-react";
import "../styles/footer.css";
import footerLogo from "../assets/footer-logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-logo">
          <img src={footerLogo}></img>
        </div>
        <div className="footer-main">
          {/* Social Links */}
          <div className="social-links">
            <a
              href="https://www.tiktok.com"
              target="_blank"
              className="social-link"
            >
              <i className="bx bxl-tiktok"></i>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              className="social-link"
            >
              <i className="bx bxl-youtube"></i>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="social-link"
            >
              <i className="bx bxl-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="social-link"
            >
              <i className="bx bxl-instagram "></i>
            </a>
            <a href="https://www.x.com" target="_blank" className="social-link">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#" className="social-link subscribe-button">
              <i class="bx bx-envelope"></i>
              <span className="subscribe-text">SUBSCRIBE</span>
            </a>
          </div>
        </div>

        {/* Copyright Text */}
        <div className="copyright">
          <p>
            COZY COVE™ and character logo™. Licensed by R2H Studios
            Distribution.
          </p>
          <p>This is a commercial website from R2H Studios.</p>
          <p>
            R2H is a trademark of the Charlotte Broadcasting Corporation. Logos
            © 1997.
          </p>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <a href="#">Contact Us</a>
          <span>•</span>
          <a href="#">Terms and Conditions</a>
          <span>•</span>
          <a href="#">Privacy Policy</a>
          <span>•</span>
          <a href="#">Cookies Policy</a>
          <span>•</span>
          <a href="#">R2H Studios</a>
          <span>•</span>
          <a href="#">Sitemap</a>
          <span>•</span>
          <a href="#">Cookie Preferences</a>
        </div>
      </div>

      {/* Back to Top Button */}
      <a href="#top" className="back-to-top" aria-label="Back to top">
        <ChevronUp size={24} className="back-to-top-icon" />
      </a>
    </footer>
  );
};

export default Footer;

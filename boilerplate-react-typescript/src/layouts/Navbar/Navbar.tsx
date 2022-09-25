import { Link } from "react-router-dom";
import "./Navbar.scss";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const logoutHandler = () => {
    return 0;
  };

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span id="logo-title-blue">pip</span>
            <span id="logo-title-green">go</span>
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={handleClick}>
                TRANG CHỦ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/resort" className="nav-links" onClick={handleClick}>
                KHU NGHỈ DƯỠNG
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/villa" className="nav-links" onClick={handleClick}>
                VILLA & KHÁCH SẠN
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/discount" className="nav-links" onClick={handleClick}>
                ƯU ĐÃI
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-links" onClick={handleClick}>
                LIÊN HỆ
              </Link>
            </li>
          </ul>

          <div className="nav-icon" onClick={handleClick}>
            <FaBars />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

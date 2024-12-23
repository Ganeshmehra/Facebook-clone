import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { LuGrip } from "react-icons/lu";
import { AiFillMessage, AiFillBell } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { FaGamepad,FaHouseChimney,FaYoutube,FaShop,FaUsers } from "react-icons/fa6";



const Navbar = () => {
  return (
    <>
      <nav className="d-flex align-items-center justify-content-between gap-2 py-2 px-3" style={{ background: "white" }}>
        {/* Left Section: Facebook Logo and Search */}
        <div className="d-flex align-items-center gap-2 ">
          <FaFacebook style={{ fontSize: "30px", color: "blue" }} />
          <input
            type="search"
            name="search"
            className="form-control rounded-pill d-none d-md-block"
            style={{ width: '200px', height: '36px' }}
            placeholder="Search"
          />
        </div>

        {/* Middle Section: Navigation Icons */}
        <div className="d-flex align-items-center justify-content-around gap-2 text-secondary w-100 fs-5 flex-grow-1">
          <Link to={"/Home"}><FaHouseChimney style={{ color: "blue" }} /></Link>
          <Link to={"/Vidios"}><FaYoutube style={{ color: "#8d8d8f" }} /></Link>
          <Link to={"/Prodcts"}><FaShop style={{ color: "#8d8d8f" }} /></Link>
          <FaUsers className="d-none d-sm-inline" />
          <Link to={"/Games"}><FaGamepad className="d-none d-sm-inline" style={{ color: "#8d8d8f" }} /></Link>
        </div>

        {/* Right Section: Utility Icons and Profile Dropdown */}
        <div className="d-flex align-items-center justify-content-end gap-2 text-dark fs-3 flex-shrink-1">
          <LuGrip className='rounded-circle p-1 d-none d-lg-block' style={{ backgroundColor: "#bbb8b8" }} />
          <AiFillMessage className='rounded-circle p-1 d-none d-md-block' style={{ backgroundColor: "#bbb8b8" }} />
          <AiFillBell className='rounded-circle p-1 d-none d-md-block' style={{ backgroundColor: "#bbb8b8" }} />
          <div className="dropdown">
            <img
              src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Profile"
              className="img-fluid dropdown-toggle rounded-circle"
              style={{ width: '30px', height: '30px' }}
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><Link className="dropdown-item" to={"/Log_In"}>Log out</Link></li>
              <li><Link className="dropdown-item" to={"/Sign_Up"}>Sign Up</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/Images/logo.png'
import icon_menu from '../../Assets/Images/icon-menu.png'
import Cookies from 'js-cookie';


const RightSideNavbar = ({isLogin, setIsLogin}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
const logout = ()=>{
  Cookies.remove('userEmail');
  setIsLogin(false)
  navigate("/");
}
  return (
    <div>
      <div className="realplaces-nav">
        <div id="logo">
          <Link to={'/'}>
            <a  title="realplaces">
              <img src={logo} alt="realplaces.in" title="realplaces" />
            </a>
          </Link>
        </div>
      </div>

      <div className="realplaces-rightside-nav">
        <input type="checkbox" id="btn" hidden checked={isOpen} readOnly />
        <label htmlFor="btn" className="menu-btn" onClick={toggleMenu}>
          <i className="fas fa-bars">
            <img src={icon_menu} alt="open" title="open" />
          </i>
          <i className="fas fa-times">
            <img src={icon_menu} alt="close" title="close" />
          </i>
        </label>
        <nav id="sidebar" className={isOpen ? 'active' : ''}>
          <div className="title">
            <Link to={'/'} title="real estate listing">
              Real Places
            </Link>
          </div>
          <ul className="list-items">
            <li className={`${isLogin?"display-none":""}`}>
              <Link to="/login">Login</Link>
            </li>
            <li className={`${isLogin?"display-none":""}`}>
              <Link to="/registration">Registration</Link>
            </li>
            <li className={`${isLogin?"":"display-none"}`}>
              <Link to="/post-property">Post property</Link>
            </li>
            <li className={`${isLogin?"":"display-none"}`}>
              <Link to="/post-flats">Post Flats</Link>
            </li>
            <li className={`${isLogin?"":"display-none"}`}>
              <Link to="/post-open-plots">Post Open Plots</Link>
            </li>
            <li className={`${isLogin?"":"display-none"}`}>
              <Link to="/post-farm-land">Post Farm Land</Link>
            </li>
            <li className={`${isLogin?"":"display-none"}`}>
              <Link to="/customer-enquiry">Customer Enquiry</Link>
            </li>
            <li className={`${isLogin?"":"display-none"}`}>
              <Link to="/profile">Dashboard</Link>
            </li>
            <li>
              <Link to="/about-us">About us</Link>
            </li>
            {/* <li>
              <Link to="/contact-us">Contact us</Link>
            </li> */}
            <li className={`${isLogin?"":"display-none"}`}>
              <Link  onClick={()=>logout()}>Log Out</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default RightSideNavbar;

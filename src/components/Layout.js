import React, { useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import logo from "../assets/images/logo1.png";
import Icons from "../Icons";
import { getUserNodes } from "../actions/profileActions";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers, FiSettings } from "react-icons/fi";
import { } from "react-icons/fi";
import { TbFileCertificate } from "react-icons/tb";
import { MdOutlineAttachEmail } from "react-icons/md";
import { SiDatabricks } from "react-icons/si";
import setAuthToken from '../utils/setAuthToken'


export default function Layout({ onLogout, children }) {
  const useRefMenu = React.useRef();


  const history = useHistory()


  const logout = () => {
    setAuthToken(null)
    onLogout()
    history.push('/login')
  }

  useEffect(() => {
    hideMiniMenu();
    window.addEventListener("resize", hideMiniMenu);
    return () => {
      window.removeEventListener("resize", hideMiniMenu); 
    };
  }, []);

  const hideMiniMenu = () => {
    const cl = useRefMenu.current.className.toString();
    if (window.innerWidth <= 778) {
      if (cl.indexOf("show") > -1) {
        useRefMenu.current.className = "navbar-panel hide";
      }
      document.getElementById("logoutButton").style.display = "block";

    } else {
      document.getElementById("logoutButton").style.display = "none";
    }
  }


  return (
    <div>
      <div className="x-layout-navbar bg-light" style={{ position: 'relative' }}>
        <button
          className="btn btn-sm btn-danger mr-4"
          onClick={logout}
        >Logout</button>
      </div>
      <div className="x-layout-sidebar">
        <div style={{ textAlign: "center" }}>
          <img
            src={logo}
            type="button"
            alt="logo"
            className="sidebar-logo"
            style={{
              filter: "saturate(0) brightness(40)"
            }}
            onClick={() => { window.location.href = "/" }}
          />
        </div>
        <div className="sidebar-title">Wise Trade Admin</div>
        <span
          className="sidebar-top-menu"
          onClick={() => {
            const cl = useRefMenu.current.className;
            if (cl.indexOf("show") > -1) {
              useRefMenu.current.className = "navbar-panel hide";
            } else {
              useRefMenu.current.className = "navbar-panel show";
            }
          }}
        >
          <Icons.Menu />
        </span>
        <div className="navbar-panel" ref={useRefMenu}>
          {/* <NavLink to="/dashboard" className="x-sidebar-menu">
            <span style={{marginRight: "1em", marginLeft: "1em"}}>
              <MdOutlineDashboard
                color="white"
                style={{width: "24px", height: "24px"}}
              />
            </span>
            {"Dashboard"}
          </NavLink> */}
          <NavLink to="/users" className="x-sidebar-menu " onClick={() => hideMiniMenu()}>
            <span style={{ marginRight: "1em", marginLeft: "1em" }}>
              <FiUsers color="white" style={{ width: "24px", height: "24px" }} />
            </span>
            {"Users"}
          </NavLink>
        {/* <NavLink to="/courses" className="x-sidebar-menu " onClick={() => hideMiniMenu()}>
            <span style={{ marginRight: "1em", marginLeft: "1em" }}>
              <SiDatabricks style={{ width: "24px", height: "24px" }} />
            </span>
            {"Courses"}
          </NavLink>

          <NavLink to="/certificates" className="x-sidebar-menu " onClick={() => hideMiniMenu()}>
            <span style={{ marginRight: "1em", marginLeft: "1em" }}>
              <TbFileCertificate style={{ width: "24px", height: "24px" }} />
            </span>
            {"Certificates"}
          </NavLink>
        */}

          <button
            id="logoutButton"
            className="btn btn-sm btn-danger x-sidebar-menu hide-on-large"
            style={{marginLeft : '3em',display: 'none' }}
            onClick={logout}
          >Logout</button>

          {/*
          <Link
              className='x-sidebar-menu'
              target='_blank'
              to={{ pathname: 'https://seven.money' }}
          >
              <span style={{ marginRight: '1em', marginLeft: '1em' }}><RiMoneyPoundCircleLine color='white' style={{ width: '24px', height: '24px' }} /></span>
              {"Seven  Money"}
          </Link>
          */}
        </div>
      </div>
      <div className="x-layout-mainbar">{children}</div>
    </div>
  );
}

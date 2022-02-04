import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebardata';
import '../comp2/navbar.css';
import { IconContext } from 'react-icons';
import { useLocation, useNavigate } from "react-router";
import IconButton from "@mui/material/IconButton";
import {  auth,
  onAuthStateChanged,
  signOut,
  ref,
  db,
  onChildAdded, } from "../config/firebase";
  import Box from "@mui/material/Box";
  import Toolbar from "@mui/material/Toolbar";
  import LogoutIcon from "@mui/icons-material/Logout";
  import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { AccountCircle } from "@mui/icons-material";
import Button from "@mui/material/Button";


function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [userLogin, setUserLogin] = useState(false);
const [loader, setLoader] = useState(false);
const [userList, setUserList] = useState([]);
const [userData, setUserData] = useState({});
const [anchorElUser, setAnchorElUser] = React.useState(null);
  const showSidebar = () => setSidebar(!sidebar);
 const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(location.state);
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <>
    {loader ? (
        <h1>Loading...</h1>
      ) : (
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
         
         <p style={{color:"white",fontWeight:"bold",fontStyle:"italic",margin:"10px auto",fontSize:15}}>IOT BASED CATTLE FARM MANAGMENT SYSTEM</p>
         <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <AccountCircle fontSize="large" sx={{ color: "#094949" }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  
                
                  <a
                    onClick={() => signOut(auth)}
                    href="/"
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem>
                      <Button variant="outlined" sx={{ margin: "5px" }}>
                        Log Out <LogoutIcon />
                      </Button>
                    </MenuItem>
                  </a>
                </Menu>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      )}
    </>
  );
}

export default Navbar;
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import { signOut, auth } from "../config/firebase";
const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("Sign out");
      // Navigation("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/Home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Health',
    path: '/Home/Reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Weight',
    path: '/Home/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Food Stock',
    path: '/Home/Foodstock',
    icon: <GiIcons.GiStockpiles />,
    cName: 'nav-text'
  },
  {
    title: 'Finance',
    path: '/Home/Finance',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'User Support',
    path: '/Home/Usersupport',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Sick',
    path: '/Home/Sick',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  
];



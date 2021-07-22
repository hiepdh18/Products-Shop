import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css'
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";

function Navbar({ component: Component, ...rest }) {




    return (
        <nav className="navbar navbar-expand-lg navbar-mainbg">
            <NavLink className="navbar-brand navbar-logo" to="/" exact>
                NCC-Shop
            </NavLink>

            <div className="collapse navbar-collapse navbar-list" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className="nav-item">
                                <NavLink className={item.cName} to={item.path} exact>
                                    <i> {item.icon}</i>
                                    {item.title}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <ul className='navbar-nav'>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signin" exact>
                            <i><AiOutlineLogin></AiOutlineLogin></i>
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signout" exact>
                            <i><AiOutlineLogout></AiOutlineLogout></i>
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

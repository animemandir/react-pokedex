import React from 'react';
import './NavStyle.css'
import MenuSearch from "./ManagePoke/MenuSearch";
import MyAlert from "../Alert/MyAlert";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

function Nav() {
    const alertInfo = useSelector(state => state.alertInfo);
    return (
        <div className="wrapper">
            {alertInfo && <MyAlert/>}
            <div className="navigation-panel">
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <NavLink className="nav-link px-2 link-dark lead"
                             to="/home">Home</NavLink>
                    <NavLink className="nav-link px-2 link-dark lead"
                             to="/favorite">Favorite</NavLink>
                </ul>
            </div>
            <div className="logo"></div>
            <MenuSearch/>
            <div className='pikachu'></div>
        </div>
    );
};

export default Nav;

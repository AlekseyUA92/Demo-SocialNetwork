import React from 'react'
import classes from './Navbar.module.css'
import { NavLink } from "react-router-dom";
import FriendsContainer from "./Friends/FriendsContainer";

let s = `${classes.item} ${classes.active}`

const Navbar = () => {
    return <nav className={classes.nav}>
        <div className={s}>
            <NavLink to="/profile" activeClassName={classes.activeLink}>Profile</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/dialogs" activeClassName={classes.activeLink}>Message</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/users" activeClassName={classes.activeLink}>Users</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/news" activeClassName={classes.activeLink}>News</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/music' activeClassName={classes.activeLink}>Music</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/settings' activeClassName={classes.activeLink}>Settings</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/friends' activeClassName={classes.activeLink}><FriendsContainer /></NavLink>
        </div>
    </nav>
}

export default Navbar
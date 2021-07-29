import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
    return <header className={s.header}>
        <img src="https://cdn.iconscout.com/icon/free/png-256/mnc-company-1956292-1650455.png" />

        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>
                    {props.login}
                    <button onClick={props.logout}>logout</button>
                </div>
                : <NavLink to={'/Login'}>Login</NavLink>
            }
        </div>
    </header>
}

export default Header
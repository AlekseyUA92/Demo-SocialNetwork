import React from 'react'
import style from './Friends.module.css'
import {NavLink} from "react-router-dom";

const ImgContainer = (props) => {
    return(
        <div className={style.person}>
            <div className={style.imgContainer}><img src="" alt=""/></div>
            <div className={style.activeName}>{props.name}</div>
        </div>
    )
}

const Friends = (props) => {

    let imagesElements = props.friends.map(i => <NavLink to={"/Friend/" + i.name}><ImgContainer name={i.name}/></NavLink>)

    return (
        <div className={style.mainWrapper}>
            <div>Friends</div>
            <div className={style.persons}>
                {imagesElements}
            </div>
        </div>
    )
}

export default Friends
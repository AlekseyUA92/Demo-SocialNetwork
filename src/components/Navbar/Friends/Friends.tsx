import React from 'react'
import style from './Friends.module.css'
import {NavLink} from "react-router-dom";
import { FriendType } from '../../../types/types';

type ImageContainerPropsType = {
    name: string 
}

const ImgContainer: React.FC<ImageContainerPropsType> = ({name}) => {
    return(
        <div className={style.person}>
            <div className={style.imgContainer}><img src="" alt=""/></div>
            <div className={style.activeName}>{name}</div>
        </div>
    )
}

type PropsType = {
    friends: Array<FriendType> 
}

const Friends: React.FC<PropsType> = (props) => {

    let imagesElements = props.friends.map(i => <NavLink to={"/Friend/" + i.name}><ImgContainer key={i.name} name={i.name}/></NavLink>)

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
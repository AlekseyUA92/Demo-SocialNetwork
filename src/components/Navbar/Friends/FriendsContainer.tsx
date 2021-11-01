import React from 'react'
import {connect} from "react-redux";
import { AppStateType } from '../../../redux/redux-store';
import { FriendType } from '../../../types/types';
import Friends from "./Friends";

type MapStateToPropsType = {
    friends: Array<FriendType>
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    friends: state.sidebar.friends
})

// type PropsType = MapStateToPropsType

// const FriendsContainer: React.FC<PropsType> = (props) => {
//     return (
//         <Friends friends={props.friends}/>
//     )
// }

const FriendsContainer = connect<MapStateToPropsType, {}, {}, AppStateType>(mapStateToProps, {})(Friends)

export default FriendsContainer

// const OldFriendsContainer = (props) => {
//
//     return (
//         <div className={style.mainWrapper}>
//             <div>Friends</div>
//             <div className={style.persons}>
//                 {imagesElements}
//             </div>
//         </div>
//     )
// }


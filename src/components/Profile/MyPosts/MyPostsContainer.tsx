import React from 'react'
import { connect } from "react-redux"

import { AppStateType } from '../../../redux/redux-store'
import { actions } from "../../../redux/profile-reducer"

import MyPosts from "./MyPosts"

import { PostType } from '../../../types/types'
import { Dispatch } from 'redux'

type MapStateToPropsType = {
    posts: Array<PostType>
    //newPostText: string
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profileData.posts,
        //newPostText: state.profileData.newPostText
    }
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostText) => {
            dispatch(actions.addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer


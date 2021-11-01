import React from 'react'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'

import classes from './MyPosts.module.css'
import Post from './Post/Post'
import {
  maxLengthCreator
} from '../../../utils/validators/validators'
import { createField, GetStringKeys, Textarea } from '../../Common/FormsControls/FormsControls'
import { PostType } from '../../../types/types'


type MapPropsType = {
  posts: Array<PostType>
}
type DispatchPropsType = {
  addPost: (newPostText: string) => void
}
type PropsType = MapPropsType & DispatchPropsType

const MyPosts: React.FC<PropsType> = React.memo((props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //     return nextProps != this.props || nextState != this.state
  // }

  let postsElements = [...props.posts]
    .reverse()
    .map((p) => <Post key={p.id} message={p.message} likes={p.likesCount} />)

  let onAddPost = (formData: AddPostFormValuesType) => {
    props.addPost(formData.newPostText)
  }

  return (
    <div className={classes.postsWrapper}>
      <h3>My posts</h3>
      <NewPostReduxForm onSubmit={onAddPost} />
      <div className={classes.posts}>{postsElements}</div>
    </div>
  )
})

// ----------- NewPostForm -----------

const maxLength200 = maxLengthCreator(200)
type OwnFormPropsType = {}

export type AddPostFormValuesType = {
  newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

let NewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, OwnFormPropsType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
      {createField<AddPostFormValuesTypeKeys>('Write your message', 'newPostText', [], Textarea)}
      </div>
      <div>
        <button type={'submit'}>Add Post</button>
      </div>
    </form>
  )
}
const NewPostReduxForm = reduxForm<AddPostFormValuesType, OwnFormPropsType>({
  form: 'ProfileNewPostForm'
})(NewPostForm)

export default MyPosts

import React, { useState } from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';
import {
  maxLengthCreator,
  required
} from '../../../utils/validators/validators';
import { Textarea } from './../../Common/FormsControls/FormsControls';

const MyPosts = React.memo((props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //     return nextProps != this.props || nextState != this.state
  // }

  let postsElements = [...props.posts]
    .reverse()
    .map((p) => <Post key={p.id} message={p.message} likes={p.likesCount} />);

  let onAddPost = (formData) => {
    props.addPost(formData.newPostText);
  };

  return (
    <div className={classes.postsWrapper}>
      <h3>My posts</h3>
      <NewPostForm onSubmit={onAddPost} />
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
});

const maxLength10 = maxLengthCreator(10);

let NewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name={'newPostText'}
          component={Textarea}
          placeholder={'Post message'}
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button type={'submit'}>Add Post</button>
        <button type={'button'}>Remove</button>
      </div>
    </form>
  );
};
NewPostForm = reduxForm({
  form: 'ProfileNewPostForm'
})(NewPostForm);

export default MyPosts;

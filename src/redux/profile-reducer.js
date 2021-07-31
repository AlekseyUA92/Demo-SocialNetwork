import { usersAPI, profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
  posts: [
    { id: 1, message: 'Hello, how are you?', likesCount: '10 likes' },
    { id: 2, message: 'This is my first post!', likesCount: '15 likes' },
    { id: 3, message: 'Do you Dima?', likesCount: '20 likes' },
    { id: 4, message: 'Yes I very do!!!', likesCount: '30 likes' },
    { id: 5, message: 'Dont repeat my name son, please.' },
    { id: 6, message: 'In the far far Kingdom...' }
  ],
  profile: null,
  status: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: state.posts.length + 1,
        message: action.newPostText,
        likesCount: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost]
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };

    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
      };

    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((p) => p.id != action.postId)]
      };

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos }
      };

    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText
});

const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});
const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status: status
});
export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId
});
export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});

// THUNK
export const getUserProfile = (userId) => async (dispatch) => {
  let response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getUserStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getUserStatus(userId);
  dispatch(setUserStatus(response.data));
};

export const updateUserStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export default profileReducer;

import profileReducer, {
  addPostActionCreator,
  deletePost
} from './profile-reducer';

let state = {
  posts: [
    { id: 1, message: 'Hello, how are you?', likesCount: '10 likes' },
    { id: 2, message: 'This is my first post!', likesCount: '15 likes' },
    { id: 3, message: 'Do you Dima?', likesCount: '20 likes' },
    { id: 4, message: 'Yes I very do!!!', likesCount: '30 likes' },
    { id: 5, message: 'Dont repeat my name son, please.' },
    { id: 6, message: 'In the far far Kingdom...' }
  ]
};

it('length of posts should be incremented', () => {
  // 1. test data
  let action = addPostActionCreator('it-kamasutra');

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(7);
});

it('message of newPost should be correct', () => {
  // 1. test data
  let action = addPostActionCreator('it-kamasutra');

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts[6].message).toBe('it-kamasutra');
});

it('after delete length of messages should be decrement', () => {
  // 1. test data
  let action = deletePost(1);

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(5);
});

it(`after delete length shouldn't be decrement if id incorrect`, () => {
  // 1. test data
  let action = deletePost(1000);

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(6);
});

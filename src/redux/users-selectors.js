import { createSelector } from 'reselect';

export const getUsersSelector = (state) => {
  return state.usersData.users;
};

// export const getUsers = createSelector(getUsersSelector, (users) => {
//   return users.filter((u) => true);
// });

export const getPageSize = (state) => {
  return state.usersData.pageSize;
};
export const getTotalUsersCount = (state) => {
  return state.usersData.totalUsersCount;
};
export const getCurrentPage = (state) => {
  return state.usersData.currentPage;
};
export const getIsFetching = (state) => {
  return state.usersData.isFetching;
};
export const getFollowingInProgress = (state) => {
  return state.usersData.followingInProgress;
};

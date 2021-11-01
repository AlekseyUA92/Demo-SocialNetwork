import { createSelector } from 'reselect';
import { AppStateType } from './redux-store';

export const getUsersSelector = (state: AppStateType) => {
  return state.usersData.users;
};

// export const getUsers = createSelector(getUsersSelector, (users) => {
//   return users.filter((u) => true);
// });

export const getPageSize = (state: AppStateType) => {
  return state.usersData.pageSize;
};
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersData.totalUsersCount;
};
export const getCurrentPage = (state: AppStateType) => {
  return state.usersData.currentPage;
};
export const getIsFetching = (state: AppStateType) => {
  return state.usersData.isFetching;
};
export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersData.followingInProgress;
};

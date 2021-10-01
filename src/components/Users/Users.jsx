import React from 'react';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';

let Users = (props) => {
  console.log(props.users);
  return (
    <div>
      <Paginator
        totalItemsCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
      />
      {props.users.map((u) => (
        <User
          user={u}
          followingInProgress={props.followingInProgress}
          unfollow={props.unfollow}
          follow={props.follow}
          key={u.id}
        />
      ))}
    </div>
  );
};

export default Users;

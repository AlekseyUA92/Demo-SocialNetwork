import React from 'react'
import { connect } from "react-redux";
import Users from "./Users";
import { follow, unfollow, setCurrentPage, toggleFollowingProgress, recieveUsers } from "../../redux/users-reducer";
import Preloader from '../Common/Preloader/Preloader'
import { compose } from 'redux';
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsersSelector } from './../../redux/users-selectors';


class UsersContainer extends React.Component {

    componentDidMount() {
        let { currentPage, pageSize } = this.props;
        this.props.recieveUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        const { pageSize } = this.props
        this.props.recieveUsers(pageNumber, pageSize)
    }

    render() {
        return (<>
            {this.props.isFetching ?
                <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}
            />
        </>)
    }

}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),

    }
}


export default compose(
    connect(mapStateToProps,
        {
            follow, unfollow, setCurrentPage, toggleFollowingProgress, recieveUsers
        })
)(UsersContainer)

//Или можно оборачивать HOC вот так:
// export default WithAuthRedirect(connect(mapStateToProps,
//     {
//         follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers
//     })(UsersContainer))






// Connect делает это по умолчанию
//
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }

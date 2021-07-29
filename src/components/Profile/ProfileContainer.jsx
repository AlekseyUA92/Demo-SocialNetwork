import React from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus } from "../../redux/profile-reducer";
import { withRouter } from 'react-router';
//import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            //userId = 16135 - старый ID
            userId = this.props.authorisedUserId;
            if (!userId) {
                // Вариант редиректа
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profileData.profile,
    status: state.profileData.status,
    authorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
    withRouter,
    //WithAuthRedirect
)(ProfileContainer)

// let AuthRedirectComponent = WithAuthRedirect(ProfileContainer);

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

// export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent)


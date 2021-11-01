import React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { compose } from 'redux'

import Profile from './Profile'
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile
} from '../../redux/profile-reducer'

import { ProfileType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'

type MapStateToPropsType = ReturnType<typeof mapStateToProps> 

type mapDispatchToPropsType = {
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
  userId: string
} 

type PropsType = MapStateToPropsType & mapDispatchToPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId
    if (!userId) {
      //userId = 16135 - старый ID
      userId = this.props.authorisedUserId
      if (!userId) {
        // Вариант редиректа
        // todo: change push to something else
        this.props.history.push('/login')
      }
    }
    if (!userId) {
      console.error(`User ID should exist in URI params or in state - authorizedUserId`)
    } else {
      this.props.getUserProfile(userId)
      this.props.getUserStatus(userId)  
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId)
      this.refreshProfile()
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhoto}
      />
    )
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profileData.profile,
  status: state.profileData.status,
  authorisedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile
  }),
  withRouter,
  WithAuthRedirect
)(ProfileContainer)


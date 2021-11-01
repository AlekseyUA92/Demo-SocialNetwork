import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from "../../redux/auth-reducer";
import Preloader from '../Common/Preloader/Preloader';
import { AppStateType } from '../../redux/redux-store';

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<PropsType> {

    // componentDidMount() {
    //     this.props.getAuthUserData()
    // }

    render() {
        return (<>
            {!this.props.isFetching ?
                <Preloader /> : null}
            <Header isAuth = {this.props.isAuth} login={this.props.login} logout={this.props.logout}/>
        </>)
    }
}

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
    isFetching: boolean
}

type MapDispatchToPropsType = {
    logout: () => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    isFetching: state.auth.isAuth
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {} ,AppStateType>(mapStateToProps, { logout })(HeaderContainer)
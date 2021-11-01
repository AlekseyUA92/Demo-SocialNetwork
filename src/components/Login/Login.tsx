import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm/LoginForm';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';
import { GetStringKeys } from '../Common/FormsControls/FormsControls';

type PropsType = MapStateToPropsType & MapDispatchToPropsType

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const Login: React.FC<PropsType & {}> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

type MapStateToPropsType = {
  isAuth: boolean
  captchaUrl: string | null
}
type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string | any) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

const LoginPage = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { login })(Login);


export default LoginPage
import React from 'react';
import {InjectedFormProps, reduxForm } from 'redux-form';
import { required } from '../../../utils/validators/validators';
import { createField, Input } from '../../Common/FormsControls/FormsControls';
import styles from '../../Common/FormsControls/FormsControls.module.css';
import { LoginFormValuesType, LoginFormValuesTypeKeys } from '../Login';

type LoginFormPropsType = {
  captchaUrl: string | null
}

const LoginForm: React.FC<LoginFormPropsType & InjectedFormProps<LoginFormValuesType, LoginFormPropsType>> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}

      {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {
        type: 'password'
      })}

      {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' }, 'rememberMe'
      )}

      {captchaUrl && <img src={captchaUrl} alt='captcha will be here...'/>}
      {captchaUrl &&
        createField('Symbols from captcha', 'captcha', [required], Input, {})}

      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export default reduxForm<LoginFormValuesType, LoginFormPropsType>({ form: 'login' })(LoginForm);

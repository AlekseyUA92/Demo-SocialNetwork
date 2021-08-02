import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../../utils/validators/validators';
import { CreateField, Input } from '../../Common/FormsControls/FormsControls';
import styles from '../../Common/FormsControls/FormsControls.module.css';

const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      {CreateField('Email', 'email', [required], Input)}

      {CreateField('Password', 'password', [required], Input, {
        type: 'password'
      })}

      {CreateField(
        null,
        'rememberMe',
        null,
        Input,
        { type: 'checkbox' },
        'rememberMe'
      )}
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export default reduxForm({ form: 'login' })(LoginForm);

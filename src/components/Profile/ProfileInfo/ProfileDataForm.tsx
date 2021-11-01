import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';

import classes from './ProfileInfo.module.css';
import styles from '../../Common/FormsControls/FormsControls.module.css';
import { createField, GetStringKeys, Input, Textarea } from '../../Common/FormsControls/FormsControls';
import { ProfileType } from '../../../types/types';

type PropsType = {
  initialValues: ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<PropsType & InjectedFormProps<ProfileType, PropsType>> = ({ initialValues, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit} className={classes.infoBlockSettings}>
      <button>save Changes</button>
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div className={classes.fullName}>
        <b>Full Name: </b> {createField<ProfileTypeKeys>('Full Name', 'fullName', [], Input)}
      </div>
      <div className={classes.lookForAJob}>
        <b>Looking for a job: </b>
        {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
      </div>
      <div>
        <b>Description of skills:</b>
        {createField<ProfileTypeKeys>(
          'Description of skills',
          'lookingForAJobDescription',
          [],
          Textarea
        )}
      </div>
      <div>
        <b>About me: </b>
        {createField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea)}
      </div>
      <div className={classes.social}>
        <b>Contacts: </b>
        {Object
          .keys(initialValues.contacts)
          .map((key) => {
          return (
            <div key={key} className={classes.contact}>
              {/*todo: make type for contacts createField*/}
              <b>
                {key}: {createField(key, 'contacts.' + key, [], Input)}
              </b>
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(
  ProfileDataForm
);

export default ProfileDataReduxForm;

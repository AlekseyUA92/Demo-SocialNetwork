import React from 'react';
import { Form, reduxForm } from 'redux-form';
import {
  CreateField,
  Input,
  Textarea
} from '../../Common/FormsControls/FormsControls';
import classes from './ProfileInfo.module.css';
import styles from '../../Common/FormsControls/FormsControls.module.css';

const ProfileDataForm = ({ profile, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit} className={classes.infoBlockSettings}>
      <button>save Changes</button>
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div className={classes.fullName}>
        <b>Full Name: </b> {CreateField('Full Name', 'fullName', [], Input)}
      </div>
      <div className={classes.lookForAJob}>
        <b>Looking for a job: </b>
        {CreateField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
      </div>
      <div>
        <b>Description of skills:</b>
        {CreateField(
          'Description of skills',
          'lookingForAJobDescription',
          [],
          Textarea
        )}
      </div>
      <div>
        <b>About me: </b>
        {CreateField('About me', 'aboutMe', [], Textarea)}
      </div>
      <div className={classes.social}>
        <b>Contacts: </b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className={classes.contact}>
              <b>
                {key}: {CreateField(key, 'contacts.' + key, [], Input)}
              </b>
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm({ form: 'edit-profile' })(
  ProfileDataForm
);

export default ProfileDataReduxForm;

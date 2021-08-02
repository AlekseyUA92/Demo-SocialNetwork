import React, { useState } from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';
import profileImage from '../../../assets/images/profileImage.jpg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  savePhoto,
  saveProfile
}) => {
  let [editMode, setEditMode] = useState(0);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(0);
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.descriptionBlock}>
        <div className={classes.avaProfile}>
          <img
            src={profile.photos.large || profileImage}
            className={classes.usersPhoto}
            alt="ProfileImage"
          />
          {isOwner && (
            <input
              className={classes.photoInput}
              type={'file'}
              onChange={onMainPhotoSelected}
            />
          )}
          <ProfileStatusWithHooks
            status={status}
            updateUserStatus={updateUserStatus}
          />
        </div>

        {editMode ? (
          <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div className={classes.infoBlock}>
      <div>{isOwner && <button onClick={goToEditMode}>edit</button>}</div>
      <h3>
        {profile.fullName} (User: {profile.userId})
      </h3>

      <div>
        <b>About me:</b> {profile.aboutMe}
      </div>
      <div className={classes.social}>
        <b>Contacts: </b>{' '}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
      <div className={classes.job}>
        <div>
          <b>Looking for a job: </b>
          {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        <div>
          <b>Description:</b>
          {profile.lookingForAJobDescription}
        </div>
      </div>
    </div>
  );
};

export const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>
        {contactTitle}: {contactValue}
      </b>
    </div>
  );
};

export default ProfileInfo;

import React from 'react'
import classes from './ProfileInfo.module.css'
import Preloader from '../../Common/Preloader/Preloader'
import profileImage from '../../../assets/images/profileImage.jpg'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'


const ProfileInfo = ({ profile, status, updateUserStatus }) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.descriptionBlock}>
                <div className={classes.avaProfile}>
                    <img src={profile.photos.small != null ? profile.photos.small : profileImage} className={classes.usersPhoto} alt='ProfileImage' />
                    {/* <img src={profile.photos.small} /> */}
                </div>
                <div className={classes.infoBlock}>
                    <h3>{profile.fullName} (User: {profile.userId})</h3>
                    <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus} />
                    <div>О себе: {profile.aboutMe}</div>
                    <div className={classes.social}>
                        <ul> Контакты:
                            <li>facebook: {profile.contacts.facebook}</li>
                            <li>website: {profile.contacts.website}</li>
                            <li>vk: {profile.contacts.vk}</li>
                            <li>twitter: {profile.contacts.twitter}</li>
                            <li>instagram: {profile.contacts.instagram}</li>
                            <li>youtube: {profile.contacts.youtube}</li>
                            <li>github: {profile.contacts.github}</li>
                            <li>mainLink: {profile.contacts.mainLink}</li>
                        </ul>
                    </div>
                    <div className={classes.job}>
                        <div className={classes.jobIndikator}>
                            true
                        </div>
                        <div>Опсиание: {profile.lookingForAJobDescription}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfileInfo
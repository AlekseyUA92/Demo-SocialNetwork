import React from 'react'
import styles from './users.module.css'
import profileImage from '../../assets/images/profileImage.jpg'
import { NavLink } from 'react-router-dom'

let User = ({ user, followingInProgress, unfollow, follow }) => {

    return (<div>
        <div >
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : profileImage} className={styles.usersPhoto} alt='ProfileImage' />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id)
                            }
                            }>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }
                            }>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'user.location.city'}</div>
                    <div>{'user.location.country'}</div>
                </span>
            </span>
        </div>
    </div>)
}



export default User
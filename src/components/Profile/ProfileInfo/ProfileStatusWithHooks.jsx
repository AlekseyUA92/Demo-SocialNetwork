import React, { useState, useEffect } from 'react'
//import classes from './ProfileInfo.module.css'


const ProfileStatusWithHooks = (props) => {

    // let stateWithSetState = useState(false);
    // let editMode = stateWithSetState[0]
    // let setEditMode = stateWithSetState[1]
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)

        props.updateUserStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <div>
            {/* {console.log('RENDER STATUS')} */}
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>
                        {props.status || '>Change your status<'}
                    </span>
                </div>
            }
            {editMode &&
                <div>
                    <input value={status}
                        onBlur={deactivateEditMode}
                        onChange={onStatusChange}
                        autoFocus={true}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks
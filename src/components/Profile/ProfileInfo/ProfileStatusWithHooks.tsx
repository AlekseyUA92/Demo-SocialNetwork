import React, { useState, useEffect } from 'react';
import classes from './ProfileInfo.module.css';

type PropsType = {
  status: string
  updateUserStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);

    props.updateUserStatus(status);
  };

  const onStatusChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div className={classes.statusWrapper}>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || '>Change your status<'}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            value={status}
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
            autoFocus={true}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;

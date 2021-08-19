import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id;
  let imgPath = props.img;

  return (
    <div className={s.dialogItem}>
      <NavLink to={path} activeClassName={s.active}>
        <div>
          <img src={imgPath} alt="profile Photo" />
        </div>
        <div>{props.name}</div>
      </NavLink>
    </div>
  );
};

export default DialogItem;

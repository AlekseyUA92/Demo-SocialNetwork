import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
  id: number
  img: string
  name: string
}

const DialogItem: React.FC<PropsType> = ({id, img, name}) => {
  let path = '/dialogs/' + id;
  let imgPath = img;

  return (
    <div className={s.dialogItem}>
      <NavLink to={path} activeClassName={s.active}>
        <div>
          <img src={imgPath} alt="profile Photo" />
        </div>
        <div>{name}</div>
      </NavLink>
    </div>
  );
};

export default DialogItem;

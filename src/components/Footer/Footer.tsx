import React from 'react';
import s from './Footer.module.scss';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.loginBlock}>
        <div>
          Icons made by{' '}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

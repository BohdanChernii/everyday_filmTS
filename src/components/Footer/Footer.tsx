import React, {FC} from 'react';

import logo from '../../images/logo.png'
import instagram from '../../images/instagram.svg'
import telegram from '../../images/telegram.svg'
import linkedin from '../../images/linkedin.svg'

import './Footer.scss'

const Footer: FC = () => {
  return (
    <footer className={'footer'}>
      <img src={logo} alt="footer__logo"/>
      <div className="footer__contacts">
        <a href="https://t.me/bohdan_cherniii">
          <img className="footer__contacts-item"
               src={telegram}
               alt=""/>
        </a>
        <a href="https://www.instagram.com/bodich_chernii/">
          <img className="footer__contacts-item"
               src={instagram}
               alt=""/>
        </a>
        <a href="https://www.linkedin.com/in/bohdan-tcherniy-0ba2151a7/">
          <img className="footer__contacts-item"
               src={linkedin} alt=""/>
        </a>
        <h3 className="footer__contacts-title">Please Contact Me</h3>
      </div>
    </footer>
  );
};

export {Footer};
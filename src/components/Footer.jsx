import { Link } from "react-router-dom";

import React from "react";
import logo from "../assets/img/logo.svg";
import mail from "../assets/img/footer/mail.svg";
import telegram from "../assets/img/footer/telegram.svg";
import whatsApp from "../assets/img/footer/whats-app.svg";

export const Footer = () => {
  return (
    <footer className="footer d-flex justify-between align-center">
      <Link to="/" className="footer__logo-block">
        <img
          className="footer__logo"
          width={170}
          height={75}
          src={logo}
          alt="Logotype"
        />
      </Link>
      <p className="footer__description">Bisi Tires © 2023</p>
      <ul className="footer__list d-flex justify-between">
        <li className="footer__item">
          <img src={mail} alt="Mail" />
        </li>
        <li className="footer__item">
          <img src={telegram} alt="Telegram" />
        </li>
        <li className="footer__item">
          <img src={whatsApp} alt="Whats Up" />
        </li>
      </ul>
    </footer>
  );
};

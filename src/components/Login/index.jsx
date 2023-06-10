import React from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  setLoginOpenned,
  setRegistrationOpenned,
} from "../../redux/slices/drawerSlice";
import {
  setPassword,
  setUsername,
  setAuthToken,
  setErrors,
} from "../../redux/slices/loginSlice";
import styles from "./Login.module.scss";
import close from "../../assets/img/cart/close-cart.svg";
import { Error } from "../Eror";

export const Login = () => {

  const { loginOpenned } = useSelector(
    (state) => state.drawerSlice
  );

  const { loginUsername, loginPassword, loginErrors } = useSelector(
    (state) => state.loginSlice
  );

  const dispatch = useDispatch();

  const onClickReg = () => {
    dispatch(setLoginOpenned(false))
    dispatch(setRegistrationOpenned(true))
    dispatch(setPassword(''));
    dispatch(setUsername(''));
    dispatch(setErrors([]));
  }

  const onClickLogin = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/token/login/",
        {
          username: loginUsername,
          password: loginPassword,
        }
      );
      dispatch(setAuthToken(loginResponse.data));
      dispatch(setLoginOpenned(false));
      dispatch(setPassword(''));
      dispatch(setUsername(''));
    } catch (error) {
      dispatch(setErrors(error.response.data));
      console.log(error.response.data);
    }
  };

  return (
    <div
      className={`${styles.overlay} ${
        loginOpenned ? styles.overlayVisible : ""
      }`}>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>Авторизируйтесь</h1>
          <img
            src={close}
            alt="Close login"
            onClick={() => dispatch(setLoginOpenned(false))}
          />
        </div>

        <form className={styles.form}>
          <div className={styles.form__item}>
            <label>Логин</label>
            <input
              required
              name="loginUsername"
              value={loginUsername}
              type="text"
              placeholder="Введите логин"
              onChange={(e) => dispatch(setUsername(e.target.value))}
            />
            {loginErrors.username
              ? loginErrors.username.map((error) => <Error error={error} />)
              : null}
          </div>

          <div className={styles.form__item}>
            <label>Пароль</label>
            <input
              required
              name="loginPassword"
              value={loginPassword}
              type="password"
              placeholder="Введите пароль"
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
            {loginErrors.password
              ? loginErrors.password.map((error) => <Error error={error} />)
              : null}

            {loginErrors.non_field_errors ? loginErrors.non_field_errors.map((error) => <Error error={error} />)
              : null}
          </div>
          <button
            onClick={(e) => onClickLogin(e)}
            type="submit" 
            className="button form__button button_color-orange">
              Войти
          </button>
        </form>

        <div className={styles.registration}>
          <h3 onClick={() => onClickReg()}>
            Регистрация
          </h3>
        </div>
      </div>
    </div>
  );
};

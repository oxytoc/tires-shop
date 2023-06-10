import React from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  setLoginOpenned,
  setRegistrationOpenned,
} from "../../redux/slices/drawerSlice";
import styles from "./Registration.module.scss";
import close from "../../assets/img/cart/close-cart.svg";
import {
  setUsername,
  setPassword,
  setErrors,
} from "../../redux/slices/registrationSlice";
import { Error } from "../Eror";

export const Registration = () => {
  const { registrationOpenned } = useSelector((state) => state.drawerSlice);

  const { username, password, errors } = useSelector(
    (state) => state.registrationSlice
  );

  const dispatch = useDispatch();

  const onClickLogin = () => {
    dispatch(setLoginOpenned(true));
    dispatch(setRegistrationOpenned(false));
    dispatch(setPassword(''));
    dispatch(setUsername(''));
    dispatch(setErrors([]));
  };

  const onClickRegister = async (e) => {
    e.preventDefault();
    try {
      const registrationResponse = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/users/",
        {
          username: username,
          password: password,
        }
      );
      dispatch(setRegistrationOpenned(false));
      dispatch(setLoginOpenned(true));
      dispatch(setPassword(''));
      dispatch(setUsername(''));
    } catch (error) {
      dispatch(setErrors(error.response.data));
    }
  };

  return (
    <div
      className={`${styles.overlay} ${
        registrationOpenned ? styles.overlayVisible : ""
      }`}>
      <div className={styles.registration}>
        <div className={styles.title}>
          <h1>Зарегестрируйтесь</h1>
          <img
            src={close}
            alt="Close login"
            onClick={() => dispatch(setRegistrationOpenned(false))}
          />
        </div>

        <form className={styles.form}>
          <div className={styles.form__item}>
            <label>Логин</label>
            <input
              required
              name="registrationUsername"
              value={username}
              type="text"
              placeholder="Введите логин"
              onChange={(e) => dispatch(setUsername(e.target.value))}
            />
            {errors.username
              ? errors.username.map((error) => <Error error={error} />)
              : null}
          </div>

          <div className={styles.form__item}>
            <label>Пароль</label>
            <input
              required
              name="registerPassword"
              value={password}
              type="password"
              placeholder="Введите пароль"
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
            {errors.password
              ? errors.password.map((error) => <Error error={error} />)
              : null}

            {errors.non_field_errors ? errors.non_field_errors.map((error) => <Error error={error} />)
              : null}
          </div>
          <button
            onClick={(e) => onClickRegister(e)}
            type="submit"
            className="button form__button button_color-orange">
            Зарегестрироваться
          </button>
        </form>
        <div className={styles.login}>
          <h3 onClick={() => onClickLogin()}>Войти</h3>
        </div>
      </div>
    </div>
  );
};

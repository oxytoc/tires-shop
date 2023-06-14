import React from "react";
import axios from "axios";
import debounce from "lodash.debounce";

import { useSelector, useDispatch } from "react-redux";
import {
  setIdItems,
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
import { setUser } from "../../redux/slices/userSlice";

export const Login = () => {

  const { loginOpenned } = useSelector(
    (state) => state.drawerSlice
  );

  const { loginUsername, loginPassword, loginErrors } = useSelector(
    (state) => state.loginSlice
  );

  const [loginValue, setLoginValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");


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
      resetAll();

      try {
        const userResponse = await axios.get("http://127.0.0.1:8000/api/v1/auth/users/", {
          headers: {
            "Authorization": `Token ${loginResponse.data.auth_token}`,
          }
        })
        console.log(userResponse.data);
        dispatch(setUser(userResponse.data));
      } catch (error) {
        console.log(error);
      }

      getCartOnLogin(loginResponse.data.auth_token)

    } catch (error) {
      dispatch(setErrors(error.response.data));
      console.log(error.response.data);
    }
  };

  const getCartOnLogin = async (authToken) => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/cart/", {
        headers: {
          "Authorization": `Token ${authToken}`,
        },
      });
      console.log(data);
      dispatch(setIdItems(data));
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeInput = (e, setter, setValue) => {
    setValue(e.target.value);
    updateWithDebounce(setter, e.target.value);
  };

  //дебаунс отложенное выполнение функции
  const updateWithDebounce = React.useCallback(
    debounce((setter,str) => {
      dispatch(setter(str));
    }, 350),
    []
  );

  const resetAll = () => {
    dispatch(setPassword(''));
    dispatch(setUsername(''));
    dispatch(setErrors([]));
    setLoginValue('');
    setPasswordValue('');
  };

  const closeLogin = () => {
    dispatch(setLoginOpenned(false));
    resetAll();
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
            onClick={() => closeLogin()}
          />
        </div>

        <form className={styles.form}>
          <div className={styles.form__item}>
            <label>Логин</label>
            <input
              required
              name="loginUsername"
              value={loginValue}
              type="text"
              placeholder="Введите логин"
              onChange={(e) => onChangeInput(e, setUsername, setLoginValue)}
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
              value={passwordValue}
              type="password"
              placeholder="Введите пароль"
              onChange={(e) => onChangeInput(e, setPassword, setPasswordValue)}
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

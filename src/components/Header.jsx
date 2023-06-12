import React from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpenned, setLoginOpenned } from "../redux/slices/drawerSlice";
import { setAuthToken } from "../redux/slices/loginSlice";

import logo from "../assets/img/logo.svg";
import search from "../assets/img/header/search.svg";
import cart from "../assets/img/header/cart.svg";
import favorite from "../assets/img/header/favorite.svg";
import user from "../assets/img/header/user.svg";
import Search from "./Search";
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {

  const { authToken } = useSelector(
    (state) => state.loginSlice
  );

  // const { cartOpenned } = useSelector((state) => state.drawerSlice);
  const dispatch = useDispatch();
  const { totalPrice } = useSelector((state) => state.drawerSlice);

  const logout = async () => {
    try {
      const logiutResponse = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/token/logout/", {}, 
        {
          headers: {
            "Authorization": `Token ${authToken.auth_token}`,
          }
        }
      );
      dispatch(setAuthToken(''));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="header d-flex justify-between align-center">
      <Link to="/">
        <img
          className="logo header__item"
          width={170}
          height={75}
          alt="logo"
          src={logo}
        />
      </Link>

      <Link to="/card">
        <button className="button_white header__item">
          <span className="fw-300 fs-24">Каталог</span>
        </button>
      </Link>

      <Link to="/card">
        <Search search={search} />
      </Link>

      <div className="header__nav d-flex justify-between">
        <div
          className="header__cart-block cu-p d-flex align-center"
          onClick={() => dispatch(setCartOpenned(true))}>
          <img
            className="header__cart"
            width={48}
            height={40}
            alt="cart"
            src={cart}
          />
          <span className="p-10">{totalPrice} руб.</span>
        </div>

        <Link to="/favorite">
          <img
            className="cu-p header__favorite"
            width={45}
            height={40}
            alt="favorite"
            src={favorite}
          />
        </Link>

        <img
          className="cu-p header__user"
          width={40}
          height={40}
          alt="user"
          src={user}
          onClick={() => dispatch(setLoginOpenned(true))}
        />
        
        {Object.keys(authToken).length !== 0 ? (
          <LogoutIcon 
            className="logout" 
            data-testid="LogoutIcon" 
            sx={{ color: "#F9F9F9", fontSize: 40, cursor: "pointer", }}
            onClick={() => logout()}/>
        ) : null}
      </div>
    </header>
  );
}

export default Header;

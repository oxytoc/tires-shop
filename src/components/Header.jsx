import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpenned } from "../redux/slices/drawerSlice";

import logo from "../assets/img/logo.svg";
import search from "../assets/img/header/search.svg";
import cart from "../assets/img/header/cart.svg";
import favorite from "../assets/img/header/favorite.svg";
import user from "../assets/img/header/user.svg";
import Search from "./Search";

function Header() {
  // const { cartOpenned } = useSelector((state) => state.drawerSlice);
  const dispatch = useDispatch();
  const { totalPrice } = useSelector((state) => state.drawerSlice);
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
        />
      </div>
    </header>
  );
}

export default Header;

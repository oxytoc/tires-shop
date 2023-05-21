import React from "react";

import DrawerItem from "../DrawerItem";

import { useSelector, useDispatch } from "react-redux";
import { setCartOpenned } from "../../redux/slices/drawerSlice";

import styles from "./Drawer.module.scss";

import closeCart from "../../assets/img/cart/close-cart.svg";
import arrowImg from "../../assets/img/cart/arrow.svg";

export const Drawer = () => {
  const { cartOpenned } = useSelector((state) => state.drawerSlice);
  const { cartItems } = useSelector((state) => state.drawerSlice);
  const { totalPrice } = useSelector((state) => state.drawerSlice);

  const dispatch = useDispatch();

  const renderCartItems = (obj) => {
    return <DrawerItem obj={obj} />;
  };

  return (
    <div
      className={`${styles.overlay} ${
        cartOpenned ? styles.overlayVisible : ""
      }`}>
      <div className={`${styles.drawer} p-30`}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            className={styles.closeDrawer}
            src={closeCart}
            alt="Close cart"
            onClick={() => dispatch(setCartOpenned(false))}
          />
        </h2>
        <div className="d-flex flex-column flex">
          <div className="items flex">
            {cartItems ? cartItems.map((obj) => renderCartItems(obj)) : null}
          </div>

          <div className={`${styles.cardTotalBlock}`}>
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>{totalPrice} руб. </b>
              </li>
            </ul>
            <button className="button">
              Оформить заказ <img src={arrowImg} alt="arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

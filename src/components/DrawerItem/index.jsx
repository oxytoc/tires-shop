import React from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { removeItem, setTotalPrice } from "../../redux/slices/drawerSlice";

import CountItem from "../CountItem";

import deleteItem from "../../assets/img/cart/delete-item.svg";
import productImgOne from "../../assets/img/tires/CP159-COPARTNER.png";

import styles from "./DrawerItem.module.scss";

export default function DrawerItem({ obj }) {
  const dispatch = useDispatch();

  const onClickRemove = async (obj) => {
    try {
      await axios.delete(`http://localhost:4000/cart/${obj.id}`);
    } catch (error) {
      alert(error);
    }
    dispatch(removeItem(obj));
    dispatch(setTotalPrice());
    // dispatch(setTotalPrice());
    // try {
    //   await axios.post(`http://localhost:4000/cart`, item);
    // } catch (error) {
    //   alert(error);
    // }
  };

  const findItem = useSelector((state) =>
    state.drawerSlice.cartItems.find((item) => item.id === obj.id)
  );
  return (
    <div
      key={obj.id}
      className={`${styles.cartItem} d-flex align-center mb-20`}>
      <img
        src={productImgOne}
        alt="Tires img"
        className={`${styles.cartItemImg}`}
      />
      <div className="mr-20 flex">
        <h3 className={styles.title}>
          Автошина {obj.model} {obj.brand} {obj.loadIndex}
        </h3>
        <p className={styles.description}>
          {obj.width}/{obj.height} R{obj.diametr} {obj.plyRating}
          PR
        </p>
        {/* <b className="fw-700 fs-20">{obj.price} руб.</b> */}
        <div className="flex flex-column justify-between">
          <b className="fw-700 fs-20">{obj.price} руб.</b>
          <CountItem productItem={obj} findItem={findItem} />
        </div>
      </div>
      <img
        className={styles.removeBtn}
        src={deleteItem}
        alt="Remove"
        onClick={() => onClickRemove(obj)}
      />
    </div>
  );
}

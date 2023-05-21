import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  decreaseItem,
  setTotalPrice,
} from "../../redux/slices/drawerSlice";

import minusImg from "../../assets/img/catalog/minus.svg";
import plusImg from "../../assets/img/catalog/plus.svg";

import styles from "./CountItem.module.scss";

export default function CountItem({ productItem, findItem }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.drawerSlice);

  const addedCount = findItem ? findItem.count : 0;

  const onClickAdd = async () => {
    dispatch(addItem(productItem));
    dispatch(setTotalPrice());
    const findItemId = cartItems.find((obj) => obj.id === productItem.id);
    try {
      if (!findItemId) {
        await axios.post(`http://localhost:4000/cart`, {
          count: 1,
          ...productItem,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const onClickDecrease = async () => {
    dispatch(decreaseItem(productItem.id));
    dispatch(setTotalPrice());
    const findItemId = cartItems.find((obj) => obj.id === productItem.id);
    console.log(findItemId);
    try {
      if (findItemId && findItemId.count === 1) {
        await axios.delete(`http://localhost:4000/cart/${productItem.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.counter}>
      <img
        src={minusImg}
        alt="Decrease item"
        onClick={() => onClickDecrease()}
      />
      <b>{addedCount}</b>
      <img src={plusImg} alt="Increase item" onClick={() => onClickAdd()} />
    </div>
  );
}

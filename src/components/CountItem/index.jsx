import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  decreaseItem,
  setTotalPrice,
  setCartItems,
} from "../../redux/slices/drawerSlice";

import minusImg from "../../assets/img/catalog/minus.svg";
import plusImg from "../../assets/img/catalog/plus.svg";

import styles from "./CountItem.module.scss";

export default function CountItem({ productItem, findItem }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.tiresSlice);
  const { cartItems } = useSelector((state) => state.drawerSlice);
  const { authToken } = useSelector((state) => state.loginSlice);
  const addedCount = findItem ? findItem.count : 0;

  const onClickAdd = async () => {
    dispatch(addItem(productItem));
    dispatch(setTotalPrice());
    try {
        await axios.patch(`http://127.0.0.1:8000/api/v1/cart/${productItem.cartId}/`, {
          count: productItem.count+1,
        }, {
          headers: {
            "Authorization": `Token ${authToken.auth_token}`,
          }
        });
    } catch (error) {
      alert(error);
    }
  };

  const onClickDecrease = async () => {
    dispatch(decreaseItem(productItem.cartId));
    dispatch(setTotalPrice());
    const findItemId = cartItems.find((obj) => obj.cartId === productItem.cartId);
    try {
      //delete
      if (findItemId && findItemId.count === 1 && authToken.length !== 0) {     
        await axios.delete(`http://127.0.0.1:8000/api/v1/cart/${productItem.cartId}/`, {
          headers: {
            "Authorization": `Token ${authToken.auth_token}`,
          }
        });
      }
      //decrese
      if (findItemId && findItemId.count > 1) {
        await axios.patch(`http://127.0.0.1:8000/api/v1/cart/${productItem.cartId}/`, {
          count: productItem.count-1,
        }, {
          headers: {
            "Authorization": `Token ${authToken.auth_token}`,
          }
        });
      }
      //updaate
      if( authToken.length !== 0 ) {
        const cartItemsResponse = await axios.get("http://127.0.0.1:8000/api/v1/cart/",  {
          headers: {
            "Authorization": `Token ${authToken.auth_token}`,
          }
        });
        const cartItems = [];
        items.map((item) => {
          cartItemsResponse.data.map((cartItem) => {
            if(item.id === cartItem.item) {
              const count = cartItem.count;
              const cartId = cartItem.id;
              cartItems.push({cartId, count, ...item});
            }
          })
        })
        dispatch(setCartItems(cartItems));
        dispatch(setTotalPrice());
      };
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

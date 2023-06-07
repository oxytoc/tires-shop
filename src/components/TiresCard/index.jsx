import React from "react";
import axios from "axios";

import CountItem from "../CountItem";

import { useDispatch, useSelector } from "react-redux";
import { addItem, setTotalPrice } from "../../redux/slices/drawerSlice";
import { toggleFavItem } from "../../redux/slices/tiresSlice";

import lickedImg from "../../assets/img/catalog/licked.svg";
import unLickedImg from "../../assets/img/catalog/unlicked.svg";

import styles from "./TiresCard.module.scss";

import productImgOne from "../../assets/img/tires/CP159-COPARTNER.png";

export default function TiresCard({
  id,
  brand,
  diametr,
  loadIndex,
  model,
  plyRating,
  price,
  width,
  height,
  imageUrl,
}) {
  const productItem = {
    id,
    brand,
    model,
    width,
    height,
    diametr,
    plyRating,
    loadIndex,
    price,
    imageUrl
  };

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.drawerSlice);
  const { favItems } = useSelector((state) => state.tiresSlice);

  const modelBrand = model + " " + brand;

  const findItem = useSelector((state) =>
    state.drawerSlice.cartItems.find((obj) => obj.id === id)
  );

  const favFindItem = favItems.find((obj) => obj.id === id);

  const onClickAdd = async () => {
    dispatch(addItem(productItem));
    dispatch(setTotalPrice());
    const findItemId = cartItems.find((obj) => obj.id === id);
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

  const onClickFavItems = async () => {
    dispatch(toggleFavItem(productItem));
    try {
      if (!favFindItem) {
        await axios.post("http://localhost:4000/favorite", { ...productItem });
      } else {
        await axios.delete(`http://localhost:4000/favorite/${id}`);
      }
    } catch (error) {}
  };

  return (
    <div className={styles.product}>
      <div
        className={styles.product__favorite}
        onClick={() => onClickFavItems()}>
        {favFindItem ? (
          <img
            src={lickedImg}
            alt="unAdded to favorite product"
            width={40}
            height={40}
          />
        ) : (
          <img
            src={unLickedImg}
            alt="Added to favorite product"
            width={40}
            height={40}
          />
        )}
      </div>
      <img
        className={styles.product__image}
        width={150}
        height={150}
        src={productImgOne}
        alt={modelBrand}
      />
      <h3 className={styles.product__title}>
        Автошина {model} {brand} {loadIndex}
      </h3>
      <p className={styles.product__description}>
        {width}/{height} R{diametr} {plyRating}PR
      </p>
      <div className="d-flex justify-between align-center">
        <div className="d-flex justify-between flex-column">
          <span className={styles.product__price}>Цена</span>
          <b className="fw-700 fs-20">{price} руб.</b>
        </div>

        {findItem ? (
          <CountItem productItem={productItem} findItem={findItem} />
        ) : (
          // <div className={styles.product__counter}>
          //   <img
          //     src={minusImg}
          //     alt="Decrease item"
          //     onClick={() => onClickDecrease()}
          //   />
          //   <b>{addedCount}</b>
          //   <img
          //     src={plusImg}
          //     alt="Increase item"
          //     onClick={() => onClickAdd()}
          //   />
          // </div>
          <img
            className={styles.product__added}
            width={50}
            height={50}
            src={imageUrl}
            alt="Added to cart"
            onClick={() => onClickAdd()}
          />
        )}
      </div>
    </div>
  );
}

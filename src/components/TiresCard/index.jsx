import React from "react";
import axios from "axios";

import CountItem from "../CountItem";

import { useDispatch, useSelector } from "react-redux";
import { addItem, setTotalPrice } from "../../redux/slices/drawerSlice";
import { toggleFavItem } from "../../redux/slices/tiresSlice";

import lickedImg from "../../assets/img/catalog/licked.svg";
import unLickedImg from "../../assets/img/catalog/unlicked.svg";
import addedImg from "../../assets/img/catalog/added.svg";

import styles from "./TiresCard.module.scss";

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
  image,
  category,
  categoryItem,
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
    image,
  };

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.drawerSlice);
  const { favItems, items } = useSelector((state) => state.tiresSlice);
  const { id: userId } = useSelector((state) => state.userSlice);

  const modelBrand = model + " " + brand;

  const { authToken } = useSelector(
    (state) => state.loginSlice
  );

  const findItem = useSelector((state) =>
    state.drawerSlice.cartItems.find((obj) => obj.id === id)
  );

  const favFindItem = favItems.find((obj) => obj.id === id);

  let cartItemsAfterResponse = {};

  const onClickAdd = async () => {
    try {
      const cartItemResponse = await axios.post('http://127.0.0.1:8000/api/v1/cart/', {
        user: userId,
        item: id,
      }, {
        headers: {
          "Authorization": `Token ${authToken.auth_token}`,
        }
      });
      items.map((item) => {
        if(item.id === cartItemResponse.data.item) {
          const count = cartItemResponse.data.count;
          const cartId = cartItemResponse.data.id;
          cartItemsAfterResponse = {cartId, count, ...item};
        }
      })
      dispatch(addItem(cartItemsAfterResponse));
      dispatch(setTotalPrice());
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
    <>
      {category ===
        categoryItem ? (
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
              src={image}
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

              { findItem ? (
                <CountItem productItem={findItem} findItem={findItem} />
              ) : (
                <img
                  className={styles.product__added}
                  width={50}
                  height={50}
                  src={addedImg}
                  alt="Added to cart"
                  onClick={() => onClickAdd()}
                />
              )}
            </div>
          </div>
        ): null}
    </>
  );
}

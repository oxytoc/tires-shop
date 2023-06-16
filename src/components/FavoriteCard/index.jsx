import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavItem, deleteFavItem } from "../../redux/slices/tiresSlice";

import lickedImg from "../../assets/img/catalog/licked.svg";
import unLickedImg from "../../assets/img/catalog/unlicked.svg";
import styles from "./FavoriteCard.module.scss";

export const FavoriteCard = ({
  model,
  brand,
  diametr,
  height,
  id,
  image,
  loadIndex,
  plyRating,
  width,
}) => {
  const modelBrand = model + " " + brand;
  const dispatch = useDispatch();
  const { favItems, items } = useSelector((state) => state.tiresSlice);
  const { id: userId } = useSelector((state) => state.userSlice);
  const { authToken } = useSelector((state) => state.loginSlice);

  const favFindItem = favItems.find((obj) => obj.id === id);

  let favItemsAfterResponse = {};

  const onClickFavItems = async () => {
    try {
      if (!favFindItem) {
        const favItemResponse = await axios.post(
          "http://127.0.0.1:8000/api/v1/favorites/",
          {
            user: userId,
            item: id,
          },
          {
            headers: {
              Authorization: `Token ${authToken.auth_token}`,
            },
          }
        );
        items.map((item) => {
          if (item.id === favItemResponse.data.item) {
            const cartId = favItemResponse.data.id;
            favItemsAfterResponse = { cartId, ...item };
            dispatch(addFavItem(favItemsAfterResponse));
          }
        });
      } else {
        console.log(favFindItem);
        await axios.delete(
          `http://127.0.0.1:8000/api/v1/favorites/${favFindItem.cartId}/`,
          {
            headers: {
              Authorization: `Token ${authToken.auth_token}`,
            },
          }
        );
        dispatch(deleteFavItem(favFindItem.id));
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
        src={image}
        alt={modelBrand}
      />
      <h3 className={styles.product__title}>
        Автошина {model} {brand} {loadIndex}
      </h3>
      <p className={styles.product__description}>
        {width}/{height} R{diametr} {plyRating}PR
      </p>
    </div>
  );
};

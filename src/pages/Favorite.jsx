import React from "react";
import { useSelector } from "react-redux";
import { FavoriteCard } from "../components/FavoriteCard";

export const Favorite = () => {
  const { favItems } = useSelector((state) => state.tiresSlice);
  return (
    <div className="favorite">
      <h1 className="main-title">Избранное</h1>
      <div className="favorite__item d-flex flex-wrap">
        {favItems.map((obj) => (
          <FavoriteCard key={obj.id} {...obj} />
        ))}
      </div>
    </div>
  );
};

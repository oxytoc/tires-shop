import React from "react";

import TiresCard from "../components/TiresCard";

import { useSelector } from "react-redux";

export const Favorite = () => {
  const { favItems } = useSelector((state) => state.tiresSlice);

  return (
    <div className="favorite">
      <h1 className="main-title">Избранное</h1>
      <div className="favorite__item d-flex flex-wrap">
        {favItems.map((obj) => (
          <TiresCard key={obj.id} {...obj} />
        ))}
      </div>
    </div>
  );
};

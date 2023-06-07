import React from "react";

import TiresCard from "../components/TiresCard";

import { useSelector } from "react-redux";
import { Options } from "../components/Options";

export const Card = () => {
  // const _ = require("lodash");

  const { items } = useSelector((state) => state.tiresSlice);
  const { value } = useSelector((state) => state.searchSlice);
  
  const renderItems = () => {
    const filterItems = items.filter((item) =>
      item.fullDescription.toLowerCase().includes(value.toLowerCase())
    );
    return filterItems.map((obj) => <TiresCard key={obj.id} {...obj} />);
  };

  return (
    <div className="card d-flex">
      <Options/>
      <div className="card__list">
        <div className="card__block">
          <button className="card__button button">
            <span>Грузовые шины</span>
          </button>
          <button className="card__button button">
            <span>Шины для спецтехники</span>
          </button>
        </div>
        {value ? (
          <h1 className="main-title mb-15">Поиск по запроу: "{value}"</h1>
        ) : (
          <h1 className="main-title mb-15">Каталог грузовых шин</h1>
        )}

        <div className="card__products d-flex justify-between flex-wrap">
          {renderItems()}
        </div>
      </div>
    </div>
  );
};

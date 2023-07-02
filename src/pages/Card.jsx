import React from "react";

import TiresCard from "../components/TiresCard";

import { useDispatch, useSelector } from "react-redux";
import { Options } from "../components/Options";
import { setCategory } from "../redux/slices/tiresSlice";

export const Card = () => {
  const dispatch = useDispatch();

  const { items, category, categoryName } = useSelector((state) => state.tiresSlice);
  const { value } = useSelector((state) => state.searchSlice);
  
  const renderItems = () => {
    const filterItems = items.filter((item) =>
      item.fullDescription.toLowerCase().includes(value.toLowerCase())
    );
    return filterItems.map((obj) => <TiresCard key={obj.id} categoryItem={category} {...obj} />);
  };

  const onClickCategory  = (category) => {
    dispatch(setCategory(category));
  }

  return (
    <div className="card d-flex">
      <Options/>
      <div className="card__list">
        <div className="card__block">
          <button className="card__button button">
            <span onClick={() => onClickCategory(1)}>Грузовые шины</span>
          </button>
          <button className="card__button button">
            <span onClick={() => onClickCategory(2)}>Шины для спецтехники</span>
          </button>
        </div>
        {value ? (
          <h1 className="main-title mb-15">Поиск по запроу: "{value}"</h1>
        ) : (
          <h1 className="main-title mb-15">{categoryName}</h1>
        )}

        <div className="card__products d-flex flex-start flex-wrap">
          {renderItems()}
        </div>
      </div>
    </div>
  );
};

import React from "react";

import arrowImg from "../assets/img/catalog/arrow-right.svg";

import TiresCard from "../components/TiresCard";

import { useSelector } from "react-redux";

export const Card = () => {
  const { items } = useSelector((state) => state.tiresSlice);
  const { value } = useSelector((state) => state.searchSlice);

  const [popup, setPopup] = React.useState(false);

  const renderItems = () => {
    const filterItems = items.filter((item) =>
      item.fullDescription.toLowerCase().includes(value.toLowerCase())
    );
    return filterItems.map((obj) => <TiresCard key={obj.id} {...obj} />);
  };

  return (
    <div className="card d-flex">
      <div className="card__options options">
        <h2 className="optoins__title">Параметры</h2>
        <ul className="options__list">
          <li
            className="options__item d-flex justify-between align-center"
            onClick={() => {
              setPopup(!popup);
            }}>
            <p className="description">Ширина</p>
            <img src={arrowImg} alt="Arrow" />
            {popup ? (
              <div className="options__popup">
                <ul>
                  <li className="active">Все</li>
                  <li>300</li>
                  <li>305</li>
                  <li>310</li>
                  <li>315</li>
                  <li>320</li>
                </ul>
              </div>
            ) : null}
          </li>
          <li className="options__item d-flex justify-between align-center">
            <p className="description">Высота</p>
            <img src={arrowImg} alt="Arrow" />
          </li>
          <li className="options__item d-flex justify-between align-center">
            <p className="description">Диаметр</p>
            <img src={arrowImg} alt="Arrow" />
          </li>
          <li className="options__item d-flex justify-between align-center">
            <p className="description">Бренд</p>
            <img src={arrowImg} alt="Arrow" />
          </li>
          <li className="options__item d-flex justify-between align-center">
            <p className="description">Слойность</p>
            <img src={arrowImg} alt="Arrow" />
          </li>
          <li className="options__item d-flex justify-between align-center">
            <p className="description">Индекс нагрузки</p>
            <img src={arrowImg} alt="Arrow" />
          </li>
          <li className="options__item">
            <div className="options__price price d-flex justify-between align-center">
              <div className="price__input">
                <input
                  type="number"
                  min="0"
                  max="999999"
                  placeholder="0 руб."
                />
              </div>
              <span></span>
              <div className="price__input">
                <input
                  type="number"
                  min="0"
                  max="999999"
                  placeholder="999999 руб."
                />
              </div>
            </div>
          </li>
        </ul>
        <div className="options__button">
          <button className=" button_white">
            <span className="fw-400 fs-32">Показать результат</span>
          </button>
        </div>
      </div>
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

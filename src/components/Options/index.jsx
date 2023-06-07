import React from "react";

import arrowImg from "../../assets/img/catalog/arrow-right.svg";

import { useSelector, useDispatch } from "react-redux";
import {
  toggleWidthPopup,
  toggleBrandPopup,
  toggleDiametrPopup,
  toggleHeightPopup,
  toggleLoadIndexPopup,
  togglePlyRatingPopup,
  setWidthValue,
  setHeightValue,
} from "../../redux/slices/optionSlice";

import { OptionItem } from "../OptionItem";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const Options = () => {
  const _ = require("lodash");
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.tiresSlice);

  // const dispatch = useDispatch();
  // const { optionPopup } = useSelector((state) => state.optionSlice);
  // console.log(optionPopup);

  // const onClickPopup = () =>{
  //   dispatch(setOptionPopup(!optionPopup))
  // }

  const {
    activeValue,
    widthPopup,
    heightPopup,
    diametrPopup,
    brandPopup,
    plyRatingPopup,
    loadIndexPopup,
    widthValue,
    heightValue,
  } = useSelector((state) => state.optionSlice);

  const filterOptionsWidth = _.uniq(items.map((item) => item.width)).sort();
  const filterOptionsBrand = _.uniq(items.map((item) => item.brand)).sort();
  const filterOptionsHeight = _.uniq(items.map((item) => item.height)).sort();
  const filterOptionsDiametr = _.uniq(items.map((item) => item.diametr)).sort();
  const filterOptionsPlyRating = _.uniq(items.map((item) => item.plyRating)).sort();
  const filterOptionsLoadIndex = _.uniq(items.map((item) => item.loadIndex)).sort();

  // const [paramsValue, setParamsValue] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickOption = (toggleOption, optionPopup) => {
    optionPopup === true
      ? dispatch(toggleOption(false))
      : dispatch(toggleOption(true));
  };

  const widthQuery = searchParams.get('width') || '';

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    console.log(formData);
    console.log(widthValue);
    console.log(heightValue);
    const height = paramsValueExist('height', heightValue);
    const width = paramsValueExist('width', widthValue);
    setSearchParams({width: widthValue, height: heightValue});
    fetchParamsData(width, height)
  };

  const changeParamsValue = (setValue, value) => {
    dispatch(setValue(value.toString()));
  };

  const paramsValueExist = (nameValue, value) =>{
    return value ? `${nameValue}=${value}` : '';
  }

  async function fetchParamsData (width, height){ 
    const {data} = await axios.get(`http://localhost:4000/items?${width}&${height}`);
    console.log(data);
  }



  return (
    <form onSubmit={handleSubmit} className="card__options options">
      <h2 className="optoins__title">Параметры</h2>
      <ul className="options__list">
        <li className="options__item">
          <div
            className="item d-flex align-center justify-between"
            onClick={() => onClickOption(toggleWidthPopup, widthPopup)}>
            <p className="description">Ширина</p>
            <img src={arrowImg} alt="Arrow" />
          </div>
          {widthPopup ? (
            <div className="options__popup">
              <ul className="popup__list">
                <li className="active">Все</li>
                {filterOptionsWidth.map((obj) => (
                  <li className={`${activeValue ? 'active' : ''}`} name="parameters" onClick={() => changeParamsValue(setWidthValue, obj)} key={obj.toString()}>{obj}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
        <li className="options__item">
          <div
            className="item d-flex align-center justify-between"
            onClick={() => onClickOption(toggleHeightPopup, heightPopup)}>
            <p className="description">Высота</p>
            <img src={arrowImg} alt="Arrow" />
          </div>
          {heightPopup ? (
            <div className="options__popup">
              <ul className="popup__list">
                <li className="active">Все</li>
                {filterOptionsHeight.map((obj) => (
                  <li onClick={() => changeParamsValue(setHeightValue, obj)}>{obj}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
        <li className="options__item">
          <div
            className="item d-flex align-center justify-between"
            onClick={() => onClickOption(toggleDiametrPopup, diametrPopup)}>
            <p className="description">Диаметр</p>
            <img src={arrowImg} alt="Arrow" />
          </div>
          {diametrPopup ? (
            <div className="options__popup">
              <ul className="popup__list">
                <li className="active">Все</li>
                {filterOptionsDiametr.map((obj) => (
                  <li>{obj}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
        <li className="options__item">
          <div
            className="item d-flex align-center justify-between"
            onClick={() => onClickOption(toggleBrandPopup, brandPopup)}>
            <p className="description">Брэнд</p>
            <img src={arrowImg} alt="Arrow" />
          </div>
          {brandPopup ? (
            <div className="options__popup">
              <ul className="popup__list">
                <li className="active">Все</li>
                {filterOptionsBrand.map((obj) => (
                  <li>{obj}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
        <li className="options__item">
          <div
            className="item d-flex align-center justify-between"
            onClick={() => onClickOption(togglePlyRatingPopup, plyRatingPopup)}>
            <p className="description">Слойность</p>
            <img src={arrowImg} alt="Arrow" />
          </div>
          {plyRatingPopup ? (
            <div className="options__popup">
              <ul className="popup__list">
                <li className="active">Все</li>
                {filterOptionsPlyRating.map((obj) => (
                  <li>{obj}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
        <li className="options__item">
          <div
            className="item d-flex align-center justify-between"
            onClick={() => onClickOption(toggleLoadIndexPopup, loadIndexPopup)}>
            <p className="description">Индекс нагрузки</p>
            <img src={arrowImg} alt="Arrow" />
          </div>
          {loadIndexPopup ? (
            <div className="options__popup">
              <ul className="popup__list">
                <li className="active">Все</li>
                {filterOptionsLoadIndex.map((obj) => (
                  <li>{obj}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
        <li className="options__item">
          <div className="options__price price d-flex justify-between align-center">
            <div className="price__input">
              <input type="number" min="0" max="999999" placeholder="0 руб." />
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
        <button type="submit" className=" button_white">
          <span className="fw-400 fs-32">Показать результат</span>
        </button>
      </div>
    </form>
  );
};

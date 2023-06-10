import React from "react";

import tires from "../assets/img/main/tires.png";
import decorOne from "../assets/img/main/decor-one.svg";
import decorTwo from "../assets/img/main/decor-two.svg";
import shipping from "../assets/img/main/shipping.svg";
import recycl from "../assets/img/main/recycl.svg";
import price from "../assets/img/main/price.svg";

export const Home = () => {
  return (
    <div className="home">
      <div className="home__intro">
        <img className="truck-tires" src={tires} alt="Truck-tires" />
        <div className="intro__text">
          <h1 className="main-title intro__main-title mb-5">
            Шины в Новосибирске
          </h1>
          <h2 className="section-title intro__section-title mb-10 ">
            По очень доступным <br /> ценам
          </h2>
          <p className="description mb-20">
            Without tires, no travel by car or motorbike. Vehicle tires must be
            in good condition and suitable for the type of road. When the time
            comes to change them, sometimes even in an emergency if you have a
            flat tire, you often have to seek a tire sales professional quickly.
            We would like him to be able to offer us a wide range of tires at
            reasonable prices.
          </p>
          <button className="text__button button">СВЯЖИТЕСЬ С НАМИ</button>
        </div>
      </div>
      <div className="home__about-services">
        <div className="services__about-us">
          <h2 className="section-title section-title_white">
            О <br /> <span>НАС</span>
          </h2>
          <p className="description description_white">
            At BISITIRES, you can buy good quality tires that will guarantee you
            the safe driving you need for your vehicle and at an unbeatable
            price. We have a large catalog where you are bound to find what you
            are looking for. Among our stock you will find passenger vehicle
            tires suitable for your use of your car at the ideal size.
          </p>
        </div>
        <img className="tire-tracks" src={decorOne} alt="Tire-tracks" />
        <div className="services">
          <div className="services__head d-flex justify-between mb-20">
            <h2 className="section-title section-title_white">
              Услуги и <br /> <span>СЕРВИС</span>
            </h2>
            <img src={decorTwo} alt="Tire-tracks-two" />
          </div>
          <ul className="services__list list d-flex justify-between">
            <li className="list__item">
              <img
                className="mb-10"
                src={shipping}
                width={42}
                height={42}
                alt="Shipping"
              />
              <h3 className=" mb-10 section-title section-title_white">
                Доставка
              </h3>
              <p className="description description_white">
                To facilitate the acquisition of your property, BISITIRES offers
                to ensure for you the transport of your tires by sea.
              </p>
            </li>
            <li className="list__item">
              <img
                className="mb-10"
                src={recycl}
                width={42}
                height={42}
                alt="Recycling"
              />
              <h3 className=" mb-10 section-title section-title_white">
                Recycling
              </h3>
              <p className="description description_white">
                At BISITIRES, all our products are tested before being marketed
                with strict respect for the environment.
              </p>
            </li>
            <li className="list__item">
              <img
                className="mb-10"
                src={price}
                width={42}
                height={42}
                alt="Price"
              />
              <h3 className=" mb-10 section-title section-title_white">Цена</h3>
              <p className="description description_white">
                BISITIRES is quality at the best price and on time, because we
                offer the best products and services available at the lowest
                prices, for ever better satisfied customers.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="home__form">
        <h2 className="section-title">Напишите нам</h2>
        <form
          id="form"
          className="form d-flex flex-column"
          action="https:jsonplaceholder.typicode.com/posts"
          autoComplete="true"
          method="post">
          <input
            id="name"
            type="text"
            className="form__input"
            name="name"
            placeholder="Имя"
          />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="form__input"
          />
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Телефон"
            className="form__input"
          />
          <textarea
            name="textarea"
            cols="30"
            rows="4"
            placeholder="Сообщение"
            className="form__text"></textarea>
          <button
            type="submit"
            className="button form__button button_color-orange">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

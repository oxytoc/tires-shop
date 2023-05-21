import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setValue } from "../../redux/slices/searchSlice";

import styles from "./Search.module.scss";

export default function Search({ search }) {
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.searchSlice);

  const onChangeValue = (event) => {
    dispatch(setValue(event.target.value));
  };

  return (
    <div className={styles.root}>
      <img
        className={styles.icon}
        width={40}
        height={40}
        alt="search"
        src={search}
      />
      <input
        type="text"
        placeholder="Поиск..."
        className={styles.input}
        value={value}
        onChange={(event) => onChangeValue(event)}
      />
    </div>
  );
}

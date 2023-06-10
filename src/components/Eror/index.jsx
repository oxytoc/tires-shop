import React from 'react'

import styles from "./Error.module.scss";

export const Error = ({error}) => {
  return (
    <p className={styles.error}>{error}</p>
  )
}

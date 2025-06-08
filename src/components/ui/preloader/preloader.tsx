import styles from './preloader.module.css';

import React from 'react';

export const Preloader = () => (
  <div className={styles.preloader}>
    <div className={styles.preloader_circle} />
  </div>
);

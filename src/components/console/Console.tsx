import React from "react";
import styles from "./Console.module.css";

const Console = () => {
  return (
    <div>
      <div className={styles.fakeMenu}>
        <div className={styles.fakeButtons}></div>
        <div className={styles.fakeMinimise}></div>
        <div className={styles.fakeZoom}></div>
      </div>
      <div className={"text-white mx-1 " + styles.fakeScreen}>
        <div>{">"} Technical Tips</div>
        <div>{">"} Career Advice</div>
        <div>{">"} Interview Hacks</div>
        <div>{">"} Community Support</div>
        <div>{">"} Industry Events</div>
      </div>
    </div>
  );
};

export default Console;

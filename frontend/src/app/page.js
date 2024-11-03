import React from "react";
import styles from "@/styles/pages/Home.module.scss";
import { Row } from "antd";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <h1 className={styles.title}>Stay One Step Ahead of Hackers</h1>
        <a href="/auth">Login to Rebound</a>
      </div>
    </div>
  );
};

export default Home;

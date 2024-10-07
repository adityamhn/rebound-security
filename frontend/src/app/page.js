import React from "react";
import styles from "@/styles/pages/Home.module.scss";
import { Row } from "antd";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Row justify="end" className={styles.navbar}>
        <a href="/auth">Get Started with Rebound Security</a>
      </Row>
    </div>
  );
};

export default Home;

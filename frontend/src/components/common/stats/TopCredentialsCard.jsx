import React from 'react'
import styles from "@/styles/pages/Dashboard.module.scss"
import { Card, Col, Row } from "antd";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";


const TopCredentialsCard = ({ data }) => {
    return (
        <Card title={"Top Credentials Used"} className={`${styles.asmCard} ${styles.topAttackCard}`}>
        <div className={styles.topAttackCardDetails}>
          {data?.map((item, index) => (
            <div key={index} className={styles.topAttackCardDetail}>
              <div className={styles.topAttackCardDetailLabel}>
                {item.username}:{item.password}
              </div>
                <div className={styles.topAttackCardDetailValue}>
                  {item.count} times
                </div>
            </div>
          ))}
        </div>
      </Card>
    )
}

export default TopCredentialsCard
import React from 'react'
import styles from "@/styles/pages/Dashboard.module.scss"
import { Card, Col, Row } from "antd";
import moment from 'moment';


const RecentSessionsCard = ({ data }) => {
    return (
        <Card title={"Recent sessions"} className={`${styles.asmCard} ${styles.topAttackCard}`}>
        <div className={styles.topAttackCardDetails}>
        <div className={styles.topAttackCardDetail}>
              <div className={styles.topAttackCardDetailLabelSecondary}>
                IP Address
              </div>
                <div className={styles.topAttackCardDetailLabelSecondary}>
                  Started At
                </div>
            </div>
          {data?.map((item, index) => (
            <div key={index} className={styles.topAttackCardDetail}>
              <div className={styles.topAttackCardDetailLabel}>
                {item.ip} {item.endtime ? " ( Session Ended )": "" }
              </div>
                <div className={styles.topAttackCardDetailValue}>
                  {moment(item.starttime).fromNow()}
                </div>
            </div>
          ))}
        </div>
      </Card>
    )
}

export default RecentSessionsCard
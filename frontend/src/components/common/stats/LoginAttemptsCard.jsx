import React from 'react'
import styles from "@/styles/pages/Dashboard.module.scss"
import { Card, Col, Row } from "antd";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";


const LoginAttemptsCard = ({ data }) => {
    return (
        <Card
            title="Authentication Attempts"
            className={`${styles.asmCard} ${styles.fullScore}`}
        >
            <Row align="middle" style={{ gap: "2rem", padding: "1rem" }}>
                <Col
                    xs={24}
                    sm={12}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ResponsiveContainer
                        width={180}
                        height={180}
                        style={{ position: "relative", textAlign: "center" }}
                    >
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="100%"
                            outerRadius="100%"
                            barSize={6}
                            startAngle={90}
                            endAngle={-270}
                            data={[
                                {
                                    score: Number(data?.total_login_attempts),
                                    fill: "#d0ed57",
                                },
                                {
                                    score: Number(data?.successful_authentications),
                                    fill: "#f44336",
                                },
                            ]}
                        >
                            <RadialBar dataKey="score" />
                        </RadialBarChart>
                        <div className={styles.showScore}>
                            {data?.total_login_attempts > 0
                                ? (( data?.successful_authentications / data?.total_login_attempts) * 100).toFixed(2)
                                : 0}
                            %
                        </div>
                    </ResponsiveContainer>
                </Col>
                <Col>
                    <div className={styles.scoreDetails}>
                        <div className={styles.scoreDetail}>
                            <div className={styles.scoreDetailValue}>{data?.total_login_attempts}</div>
                            <div className={styles.scoreDetailLabel}>Total Login Attempts</div>
                        </div>
                        <div className={styles.scoreDetail}>
                            <div className={styles.scoreDetailValue}>
                                {data?.successful_authentications}
                            </div>
                            <div className={styles.scoreDetailLabel}>
                                Successful Authentications
                            </div>
                        </div>
                        <div className={styles.scoreDetail}>
                            <div className={styles.scoreDetailValue}>
                                {data?.unique_attackers}
                            </div>
                            <div className={styles.scoreDetailLabel}>
                                Unique Attackers
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    )
}

export default LoginAttemptsCard
import React from 'react'
import styles from "@/styles/pages/Dashboard.module.scss"
import { Card, Col, Row } from "antd";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const COLORS = ['#C83931cc', '#E29F25cc', '#52CF47cc', '#AAAAAAcc'];
const data = [
    {
        name: "High",
        value: 10
    },
    {
        name: "Medium",
        value: 20
    },
    {
        name: "Low",
        value: 30
    },
    {
        name: "Info",
        value: 40
    }
];

const TopCommandsCard = ({ data }) => {
    return (
        <Card
            title="Most Common Commands Used by Attackers"
            className={`${styles.asmCard} ${styles.fullScore}`}>
            <Row align="middle">
                <ResponsiveContainer width={"100%"} height={400} style={{ position: "relative", marginTop: "2rem" }}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 20,
                            left: -30,
                            bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="command" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Row>

        </Card>
    )
}

export default TopCommandsCard
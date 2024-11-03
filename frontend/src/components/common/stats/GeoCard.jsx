import React from 'react'
import styles from "@/styles/pages/Dashboard.module.scss"
import { Card, Col, Row } from "antd";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import CountryMapGraph from '../dashboard/CountryMapGraph';
import { countries } from '@/utils/countries';


const getHeatMapData = (countryWiseIPs) => {
    const data = {};
    Object.keys(countryWiseIPs).forEach((key) => {

        data[key] = countryWiseIPs[key].count;
    }
    );

    console.log(data)

    return data;
};

const GeoCard = ({ data }) => {
    return (
        <Card
            title="Geographical Attack Map"
            className={`${styles.asmCard} ${styles.fullScore}`}
        >
            {data && (
            <CountryMapGraph
                userData={getHeatMapData(data)}
            />
            )}
        </Card>
    )
}

export default GeoCard
"use client";

import React from 'react'
import styles from "@/styles/pages/Dashboard.module.scss"
import { Col, Row } from 'antd';
import LoginAttemptsCard from '@/components/common/stats/LoginAttemptsCard';
import { getCommonCommands, getGeoData, getLoginAttempts, getRecentSessions, getTopCreds } from '@/services/stats.service';
import { useQuery } from 'react-query';
import GeoCard from '@/components/common/stats/GeoCard';
import TopCredentialsCard from '@/components/common/stats/TopCredentialsCard';
import RecentSessionsCard from '@/components/common/stats/RecentSessionsCard';
import TopCommandsCard from '@/components/common/stats/TopCommandsCard';


const Dashboard = () => {

  const {data: loginAttemptsData} = useQuery('loginAttempts', getLoginAttempts)
  const {data: geoData} = useQuery('geoData', getGeoData)
  
  const {data: topCreds} = useQuery('topCreds', getTopCreds)
  const {data: recentSessions} = useQuery('recentSessions', getRecentSessions)
  const {data: topCommands} = useQuery('topCommands', getCommonCommands)




  return (
    <div className={styles.dashboardContainer}>
           <div className={styles.dashboardHeader}>
          <h1 className={styles.heading}>
            Dashboard
          </h1>
        </div>
    <div className={styles.dashboardPageContaner}>
      <Row className={styles.dashboardStatsRow}>
        <Col span={12} className={styles.dashboardStat} style={{paddingRight:"0.5rem"}}>
        <LoginAttemptsCard data={loginAttemptsData} />
        </Col>
        <Col span={12} className={styles.dashboardStat} style={{paddingLeft:"0.5rem"}}>
        <GeoCard data={geoData?.geographical_attack_map} />
        </Col>
      </Row>
      <Row className={styles.dashboardStatsRow}>
        <Col span={12} className={styles.dashboardStat} style={{paddingRight:"0.5rem"}}>
        <TopCredentialsCard data={topCreds?.top_credentials} />
        </Col>
        <Col span={12} className={styles.dashboardStat} style={{paddingRight:"0.5rem"}}>
        <RecentSessionsCard data={recentSessions?.recent_sessions} />
        </Col>
      
      </Row>
      <Row className={styles.dashboardStatsRow}>
        <Col span={24} className={styles.dashboardStat} style={{paddingRight:"0.5rem"}}>
        <TopCommandsCard data={topCommands?.command_frequency} />
        </Col>
        
      
      </Row>

    </div>
    </div>
  )
}

export default Dashboard
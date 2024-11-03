"use client"

import React, { useState } from 'react'
import styles from "@/styles/pages/Dashboard.module.scss"
import { Col, Row } from 'antd'
import PrimaryButton from '@/components/common/PrimaryButton'
import { PlusOutlined } from '@ant-design/icons'

import { MdOutlineModeEdit } from 'react-icons/md'
import { usePathname, useRouter } from 'next/navigation'

import { useQuery } from 'react-query'
import { getAllActions, getAllCredentials, getAllFingerprints, getAllSessions } from '@/services/logs.service'
import FingerprintsTable from '@/components/common/tables/FingerprintsTable'


// const honeypots = [
//   {
//     name: "Honeypot 1",
//     id: "1",
//     description: "This is a honeypot",
//     createdAt: "2024-10-10"
//   }
// ]

const totalHoneypots = 10

const KeyFingerprints = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { data, isLoading } = useQuery("fingerprints", getAllFingerprints, {
    refetchInterval: 10000
  })

  // Modals
  const [addTenantModal, setAddTenantModal] = useState(false);

  const honeypotTableDropdownItems = [
    {
      label: "View Honeypot details",
      icon: <MdOutlineModeEdit className={styles.icon} />,
      onClick: (record) => setAddTenantModal({ ...record, edit: true })
    },

  ]




  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.heading}>
            Fingerprints Detected
          </h1>
          <p className={styles.description}>
            This page shows SSH fingerprints detected by the honeypots
          </p>
        </div>
        {/* <Row align="middle" justify="space-between" className={styles.actionsContainer}>
          <Col className={styles.filterContainer}>
            <SearchBar
              placeholder="Search credentials"
              className={styles.filterbar}
              allowClear
            />
          </Col>
        </Row> */}
        <div className={styles.dashboardTableContainer}>
          <FingerprintsTable sessions={data?.fingerprints} loading={isLoading && !data}/>
        </div>


        {/* Modals */}
        {/* <AddTenantModal visible={addTenantModal} setVisible={setAddTenantModal} projectKey={projectKey} revalidate={revalidate} /> */}
        {/* <UploadModal visible={uploadModal} setVisible={setUploadModal} type="tenant" label="Tenant" /> */}
      </div>
    </>

  )
}

export default KeyFingerprints
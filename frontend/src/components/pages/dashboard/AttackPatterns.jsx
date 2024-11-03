"use client"

import React, { useState } from 'react'
import styles from "@/styles/pages/Dashboard.module.scss"
import { Col, Row } from 'antd'
import PrimaryButton from '@/components/common/PrimaryButton'
import { PlusOutlined } from '@ant-design/icons'

import { MdOutlineModeEdit } from 'react-icons/md'
import { usePathname, useRouter } from 'next/navigation'

import HoneypotTable from '@/components/common/tables/HoneypotTable'
import SearchBar from '@/components/common/SearchBar'
import CredentialsTable from '@/components/common/tables/CredentialsTable'
import { useQuery } from 'react-query'
import { getAllActions, getAllCredentials } from '@/services/logs.service'
import ActionsTable from '@/components/common/tables/ActionsTable'


// const honeypots = [
//   {
//     name: "Honeypot 1",
//     id: "1",
//     description: "This is a honeypot",
//     createdAt: "2024-10-10"
//   }
// ]

const totalHoneypots = 10

const AttackPatterns = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { data, isLoading } = useQuery("actions", getAllActions, {
    refetchInterval: 2000
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
            Attack Patterns
          </h1>
          <p className={styles.description}>
            View all the command executions that have been detected by the honeypots
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
          <ActionsTable actions={data?.actions} loading={!data && isLoading} />
        </div>


        {/* Modals */}
        {/* <AddTenantModal visible={addTenantModal} setVisible={setAddTenantModal} projectKey={projectKey} revalidate={revalidate} /> */}
        {/* <UploadModal visible={uploadModal} setVisible={setUploadModal} type="tenant" label="Tenant" /> */}
      </div>
    </>

  )
}

export default AttackPatterns
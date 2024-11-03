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
import { getAllCredentials } from '@/services/logs.service'


// const honeypots = [
//   {
//     name: "Honeypot 1",
//     id: "1",
//     description: "This is a honeypot",
//     createdAt: "2024-10-10"
//   }
// ]

const totalHoneypots = 10

const CredentialsFound = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { data, isLoading } = useQuery("credentials", getAllCredentials, {
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
            Credentials Found
          </h1>
          <p className={styles.description}>
            View all authentication attempts made on your network and their status
          </p>
        </div>
        <Row align="middle" justify="space-between" className={styles.actionsContainer}>
          <Col className={styles.filterContainer}>
            <SearchBar
              placeholder="Search credentials"
              className={styles.filterbar}
              allowClear
            />
          </Col>
          {/* <Col>
            <PrimaryButton
              onClick={() => setAddTenantModal(true)}
              size="small" icon={<PlusOutlined />}>
              Create Honeypot
            </PrimaryButton>

          </Col> */}
        </Row>
        <div className={styles.dashboardTableContainer}>
          <CredentialsTable credentials={data?.credentials} loading={isLoading && !data} />
        </div>


        {/* Modals */}
        {/* <AddTenantModal visible={addTenantModal} setVisible={setAddTenantModal} projectKey={projectKey} revalidate={revalidate} /> */}
        {/* <UploadModal visible={uploadModal} setVisible={setUploadModal} type="tenant" label="Tenant" /> */}
      </div>
    </>

  )
}

export default CredentialsFound
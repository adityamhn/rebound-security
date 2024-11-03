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


const honeypots = [
  {
    name: "Rebound Honeypot",
    id: "1",
    description: "This is a honeypot",
    createdAt: "2024-10-10"
  }
]

const totalHoneypots = 1

const Honeypots = () => {
  const router = useRouter()
  const pathname = usePathname()

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
            Honeypot Management
          </h1>
        </div>
        <Row align="middle" justify="space-between" className={styles.actionsContainer}>
          <Col className={styles.filterContainer}>
            <SearchBar
              placeholder="Search HoneyPots"
              className={styles.filterbar}
              allowClear
            />
          </Col>
          <Col>
            <PrimaryButton
              onClick={() => setAddTenantModal(true)}
              size="small" icon={<PlusOutlined />}>
              Create Honeypot
            </PrimaryButton>

          </Col>
        </Row>
        <div className={styles.dashboardTableContainer}>
          <HoneypotTable honeypotTableDropdownItems={honeypotTableDropdownItems} honeypots={honeypots} totalHoneypots={totalHoneypots} />
        </div>


        {/* Modals */}
        {/* <AddTenantModal visible={addTenantModal} setVisible={setAddTenantModal} projectKey={projectKey} revalidate={revalidate} /> */}
        {/* <UploadModal visible={uploadModal} setVisible={setUploadModal} type="tenant" label="Tenant" /> */}
      </div>
    </>

  )
}

export default Honeypots
"use client";

import React, { useEffect } from 'react'
import styles from "@/styles/components/Header.module.scss"
import { Breadcrumb, Col, Dropdown, Row } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProfileDropdown from './ProfileDropdown';
import ManageAccountModal from '../modals/ManageAccountModal';
import { useMutation } from 'react-query';
import {  userLogout } from '@/services/auth.service';
import { logout } from '@/store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { showConfirm } from '../modals/ConfirmModal';
import { RiNotification2Line } from 'react-icons/ri';

const Header = ({ }) => {
  const pathname = usePathname()
  const dispatch = useDispatch();
  const router = useRouter();

  const {user} = useSelector(state => state.user);

  const [manageAccountModalVisible, setManageAccountModalVisible] = React.useState(false);

  const logoutMutation = useMutation(userLogout, {
    onSuccess: () => {
      dispatch(logout())
      router.push("/auth")
    }
  })

  const handleLogout = () => {
    showConfirm({
      title: `Are you sure you want to logout?`,
      okText: `Logout`,
      onOk: async () => {
        await logoutMutation.mutateAsync()
      },
    })
  }



  const breadcrumbMap = {
    [`/dashboard`]: ['dashboard'],
    [`/dashboard/honeypots`]: ['honeypots'],
    [`/dashboard/credentials`]: ['credentials'],

    // [`/dashboard/roles`]: ['Roles'],
    // [`/dashboard/tenants`]: ['Tenants'],
    // [`/dashboard/users`]: ['Users'],
    // [`/dashboard/policy`]: ['Policy Editor'],
    // [`/dashboard/logs`]: ['Activity Logs'],
    // [`/dashboard/settings`]: ['Settings'],
    // [`/dashboard/settings/team`]: ['Settings', 'Team'],
    // [`/dashboard/settings/keys`]: ['Settings', 'Api keys'],


  };

  // useEffect(() => {
  //   setCurrentProject(projects.find(project => project.projectKey === projectKey));
  // }, [projects, projectKey]);



  return (
    <>
      <Row align="middle" justify="space-between" className={styles.headerContainer}>
        <Col className={styles.headerLeft}>
          {/* <Breadcrumb
            items={[
              // {
              //   title: `${currentProject?.projectName}`,
              // },
              ...breadcrumbMap[pathname].map((title) => ({ title })),

            ]}
          /> */}
        </Col>
        <Col className={styles.headerRight}>
          <Row
            align="middle"
            style={{
              gap: "1.5rem"
            }}
          >
            <div className={`${styles.profileDropdownContainer} ${styles.notificationContainer}`}>
              <Dropdown trigger={["click"]} >
                <Row align="middle" className={styles.profileDropdownButton}>
                  <RiNotification2Line className={styles.downArrow} />
                </Row>
              </Dropdown>
            </div>
            <div className={styles.profileDropdownContainer}>
              <Dropdown trigger={["click"]} dropdownRender={() => <ProfileDropdown handleLogout={handleLogout} setManageAccountModalVisible={setManageAccountModalVisible} />}>
                <Row align="middle" className={styles.profileDropdownButton}>
                  <div className={styles.userName}>{user?.username}</div>
                  <MdOutlineKeyboardArrowDown className={styles.downArrow} />
                </Row>
              </Dropdown>
            </div>
          </Row>
        </Col>
      </Row>


      {/* Modals */}
      <ManageAccountModal visible={manageAccountModalVisible} setVisible={setManageAccountModalVisible} handleLogout={handleLogout} />
    </>

  )
}

export default Header
"use client";

import React, { useEffect } from "react";
import styles from "@/styles/components/Sidebar.module.scss";
import { Avatar, Dropdown, Row } from "antd";
import { MdOutlineKeyboardArrowDown, MdOutlineDashboard } from "react-icons/md";
import { TbSettings } from "react-icons/tb";
import { PiStackSimpleBold, PiCirclesThreeBold, PiUsersBold, PiBuildingsBold, PiCodeSimpleBold, PiDatabase } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
// import ProjectDropdown from "./ProjectDropdown";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  // const [currentProject, setCurrentProject] = React.useState(projects.find(project => project.projectKey === projectKey));

  const items = [
    {
      label: "",
      children: [
        {
          icon: <MdOutlineDashboard />,
          label: `Dashboard`,
          path: `/dashboard`,
        },
      ]
    },
    {
      label: "Features",
      children: [
        {
          icon: <PiStackSimpleBold />,
          label: `Honeypots`,
          path: `/dashboard/honeypots`,
        },
        {
          icon: <PiCirclesThreeBold />,
          label: `Alerts`,
          path: `/dashboard/alerts`,
        },
        {
          icon: <PiCodeSimpleBold />,
          label: `Threat Intelligence`,
          path: `/dashboard/threat-intelligence`,
        },

      ]
    },
    {
      label: "Threat Intelligence",
      children: [
        {
          icon: <PiDatabase />,
          label: `Attacker Sessions`,
          path: `/dashboard/sessions`,
        },
        {
          icon: <PiDatabase />,
          label: `Credentials Found`,
          path: `/dashboard/credentials`,
        },
        {
          icon: <PiDatabase />,
          label: `Attack Patterns`,
          path: `/dashboard/attack-patterns`,
        },
        {
          icon: <PiDatabase />,
          label: `Fingerprints Detected`,
          path: `/dashboard/fingerprints`,
        },
      ]
    },
    {
      label: "Others",
      children: [
        {
          icon: <TbSettings />,
          label: `Settings`,
          path: `/dashboard/settings`,
        },
        {
          icon: <TbSettings />,
          label: `Integrations`,
          path: `/dashboard/integrations`,
        },
      ]
    },

  ];

  // useEffect(() => {
  //   setCurrentProject(projects.find(project => project.projectKey === projectKey));
  // }, [projects, projectKey]);


  const handleClick = (path) => {
    router.push(path);
  }

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.projectSelectorContainer}>
          {/* <Dropdown trigger={["click"]}> */}
            <Row align="middle" className={styles.projectSelectorButton}>
              <Avatar shape="square" className={styles.projectIcon}>R</Avatar>
              <div className={styles.projectName}>Rebound</div>
              {/* <MdOutlineKeyboardArrowDown className={styles.downArrow} /> */}
            </Row>
          {/* </Dropdown> */}
        </div>
        <div className={styles.sidebarItemsContainer}>
          {items.map((itemsType, index) => (
            <div className={styles.sidebarItemsType} key={`${itemsType}-${index}`}>
              <div className={styles.type}>{itemsType.label}</div>
              {itemsType.children.map((item, index) => (
                <Row
                  align="middle"
                  className={`${styles.sidebarItem} ${pathname === item.path && styles.activeItem}`}
                  onClick={() => handleClick(item.path)}
                  key={`${item.label}-${index}`}>
                  <div className={styles.sidebarItemIcon}>{item.icon}</div>
                  <div className={styles.sidebarItemLabel}>{item.label}</div>
                </Row>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

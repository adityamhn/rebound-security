"use server";

import Sidebar from "@/components/common/dashboard/Sidebar.jsx";
import React from "react";
import styles from "@/styles/pages/DashboardLayout.module.scss";
import Header from "@/components/common/dashboard/Header";
import Redirect from "@/components/common/constants/Redirect";
import { useServerSide } from "@/services/constants";
import { cookies } from "next/headers";
import { checkUserLoginStatus } from "@/services/auth.service";
import AntConfig from "@/components/common/constants/AntConfig";
// import { getUserDetails } from "@/services/user.service";
// import { checkValidProject } from "@/services/project.service";
// import AntConfig from "@/components/common/constants/AntConfig";

const DashboardLayout = async ({ children }) => {
  const cookieStore = cookies();
  const sid = cookieStore.get("access_token_cookie");

  const { data, error } = await useServerSide(() =>
    checkUserLoginStatus({ sid: sid?.value })
  );

  // if ((error && !error?.isLoggedIn) || !data?.isLoggedIn) {
  //   return <Redirect to="/auth" />;
  // }

  return (
    <AntConfig>
    <div className={styles.dashboardLayoutContainer}>
      <Sidebar />
      <div className={styles.dashboardLayout}>
        <Header
          // projectKey={projectKey}
          // projects={user?.projects}
        />
        {children}
      </div>
    </div>
    </AntConfig>
  );
};

export default DashboardLayout;

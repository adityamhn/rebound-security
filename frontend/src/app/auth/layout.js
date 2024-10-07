"use server";

import React from "react";
import styles from "@/styles/pages/Auth.module.scss";
import { useServerSide } from "@/services/constants";
import { cookies } from "next/headers";
import Redirect from "@/components/common/constants/Redirect";
import { checkUserLoginStatus } from "@/services/auth.service";

const AuthLayout = async ({ children }) => {
  const cookieStore = cookies();
  const sid = cookieStore.get("sid");
  const { data, error } = await useServerSide(() =>
    checkUserLoginStatus({ sid: sid?.value })
  );

  if (data?.isLoggedIn) {
      return <Redirect to="/dashboard" />;
  }



  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrapper}>{children}</div>
    </div>
  );
};

export default AuthLayout;

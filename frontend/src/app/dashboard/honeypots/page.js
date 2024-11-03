import Honeypots from "@/components/pages/dashboard/Honeypots";
import { cookies } from "next/headers";
import React from "react";

const TenantsPage = async () => {
//   const { projectKey } = params;
//   const { q, starting_after, ending_before } = searchParams;

  const cookieStore = cookies();
  const rsid = cookieStore.get("rsid");

//   const { data, error } = await useServerSide(() =>
//     getAllTenants({
//       rsid: rsid?.value,
//       projectKey,
//       q,
//       starting_after,
//       ending_before,
//     })
//   );

//   const revalidate = async () => {
//     "use server";
//     revalidatePath(`/${projectKey}/tenants`, "page");
//   };

  return (
    <Honeypots/>
  );
};

export default TenantsPage;

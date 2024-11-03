import CredentialsFound from "@/components/pages/dashboard/CredentialsFound";
import { cookies } from "next/headers";
import React from "react";

const CredentialsPage = async () => {
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
    <CredentialsFound />
  );
};

export default CredentialsPage;

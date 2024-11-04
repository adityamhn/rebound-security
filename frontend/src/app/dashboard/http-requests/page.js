import AttackerSessions from "@/components/pages/dashboard/AttackerSessions";
import AttackPatterns from "@/components/pages/dashboard/AttackPatterns";
import CredentialsFound from "@/components/pages/dashboard/CredentialsFound";
import HTTPRequests from "@/components/pages/dashboard/HTTPRequests";
import KeyFingerprints from "@/components/pages/dashboard/KeyFingerprints";
import { cookies } from "next/headers";
import React from "react";

const HTTPRequetsPage = async () => {
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
    <HTTPRequests />
  );
};

export default HTTPRequetsPage;

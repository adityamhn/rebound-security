"use client"

import { ConfigProvider } from 'antd'
import React from 'react'
import styles from "@/styles/components/Common.module.scss"
import Image from 'next/image';
import emptyState from "@/assets/common/emptyState.svg"
import { useParams, usePathname, useSearchParams } from 'next/navigation';

const getEmptyStateText = (pathname, projectKey) => {
    switch (pathname) {
        case `/dashboard/fingerprints`: {
            return "No Records found"
        }
        default:
            return "Data Not Found"
    }
}

const AntConfig = ({ children }) => {
    const pathname = usePathname();
    const { projectKey } = useParams();
    const searchParams = useSearchParams();
    const q = searchParams.get("q");


    const renderEmpty = () => (
        <div className={styles.emptyStateContainer}>
            <Image src={emptyState} width={90} height={90} className={styles.emptyStateImage} alt="Empty State" />
            <div className={styles.emptyStateImageText}>{getEmptyStateText(pathname, projectKey)}</div>
    

        </div>
    );

    return (
        <ConfigProvider renderEmpty={renderEmpty}>
            {children}
        </ConfigProvider>
    )
}

export default AntConfig
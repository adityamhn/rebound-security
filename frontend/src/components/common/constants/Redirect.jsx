"use client";

import { useRouter } from 'next/navigation'
import React from 'react'

const Redirect = ({ to }) => {
    const router = useRouter();

    React.useEffect(() => {
            router.replace(to)
    }, [to])

    return <></>;
}

export default Redirect
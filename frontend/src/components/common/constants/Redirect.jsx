"use client";

import { update } from '@/store/user.slice';
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux';

const Redirect = ({ to, ...rest }) => {
    const router = useRouter();
    const { updateUser, user } = rest;
    const dispatch = useDispatch();

    React.useEffect(() => {

        if (updateUser) {
            dispatch(update(user))
        }
        router.replace(to)
    }, [to])

    return <></>;
}

export default Redirect
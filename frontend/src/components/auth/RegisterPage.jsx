"use client";

import { Form, Input, message } from 'antd'
import React from 'react'
import styles from "@/styles/pages/Auth.module.scss"
import formStyles from "@/styles/components/Form.module.scss"
import PrimaryButton from '@/components/common/PrimaryButton'
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { userSignup } from '@/services/auth.service';

const RegisterPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    const userRegisterMutation = useMutation(userSignup, {
        onSuccess: (data) => {
            messageApi.success("Register successful!");
            router.push(`/login`)
        },
        onError: (error) => {
            messageApi.error(error?.response?.data?.message || "Something went wrong")
        }
    })

    const handleRegister = async (values) => {
        await userRegisterMutation.mutateAsync({
            username: values.username,
            password: values.password
        })
    }

    return (
        <>
            {contextHolder}
            <div className={styles.authFormContainer}>
                <h1 className={styles.title}>Register</h1>
                {/* <p className={styles.description}>Enter your credentials</p> */}
                <Form className={`${formStyles.formContainer} ${styles.authForm}`} layout='vertical' onFinish={handleRegister}>
                    <Form.Item
                        label="Username"
                        name="username"

                        className={`${formStyles.formItem}`}
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                },
                            ]
                        }
                    >
                        <Input className={formStyles.formInput} placeholder='Enter your username' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        className={`${formStyles.formItem}`}
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                }
                            ]
                        }
                    >
                        <Input.Password className={formStyles.formInputPassword} placeholder='Enter your email' />
                    </Form.Item>
                    <PrimaryButton
                        className={formStyles.formButton}
                        htmlType='submit'
                        loading={userRegisterMutation.isLoading}
                    >Register</PrimaryButton>
                </Form>

            </div>
        </>

    )
}

export default RegisterPage
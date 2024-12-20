"use client";

import { Form, Input, message } from 'antd'
import React from 'react'
import styles from "@/styles/pages/Auth.module.scss"
import formStyles from "@/styles/components/Form.module.scss"
import PrimaryButton from '@/components/common/PrimaryButton'
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { userLogin } from '@/services/auth.service';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/user.slice';

const LoginPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const userLoginMutation = useMutation(userLogin, {
        onSuccess: (data) => {
            message.success("Login successful!");
            dispatch(loginUser(data.user))
            router.push(`/dashboard`)
        },
        onError: (error) => {
            message.error(error?.response?.data?.message || "Something went wrong")
        }
    })

    const handleLogin = async (values) => {
        await userLoginMutation.mutateAsync({
            username: values.username,
            password: values.password
        })
    }

    return (
        <>
            <div className={styles.authFormContainer}>
                <h1 className={styles.title}>Secure Your Network</h1>
                <p className={styles.description}>Log in to manage your honeypots</p>
                <Form className={`${formStyles.formContainer} ${styles.authForm}`} layout='vertical' onFinish={handleLogin}>
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
                        loading={userLoginMutation.isLoading}
                    >Login</PrimaryButton>
                    <PrimaryButton
                        onClick={() => router.push('/auth/register')}
                        buttonType="text"
                        className={styles.forgotPasswordBtn}
                    >
                        New here? Register
                    </PrimaryButton>
                </Form>

            </div>
        </>

    )
}

export default LoginPage
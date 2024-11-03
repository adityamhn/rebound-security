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
    const router = useRouter();

    const userRegisterMutation = useMutation(userSignup, {
        onSuccess: (data) => {
            message.success("Registration successful!");
            router.push(`/auth`)
        },
        onError: (error) => {
            message.error(error?.response?.data?.message || "Something went wrong")
        }
    })

    const handleRegister = async (values) => {
        await userRegisterMutation.mutateAsync({
            username: values.username,
            password: values.password,
            email: values.email
        })
    }

    return (
        <>
            <div className={styles.authFormContainer}>
                <h1 className={styles.title}>Join Rebound Security</h1>
                <p className={styles.description}>Sign up to start defending with Rebound Security</p>
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
                                {
                                    min: 4,
                                    message: 'Username must be at least 4 characters long'
                                }
                            ]
                        }
                    >
                        <Input className={formStyles.formInput} placeholder='Enter your username' />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"

                        className={`${formStyles.formItem}`}
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                },
                                {
                                    type: 'email',
                                    message: 'Please input a valid email!'
                                }
                            ]
                        }
                    >
                        <Input className={formStyles.formInput} placeholder='Enter your email' />
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
                                },
                                {
                                    min: 8,
                                    message: 'Password must be at least 8 characters long'
                                },
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
                    <PrimaryButton
                        onClick={() => router.push('/auth')}
                        buttonType="text"
                        className={styles.forgotPasswordBtn}
                    >
                        Already a member? Login
                    </PrimaryButton>
                </Form>

            </div>
        </>

    )
}

export default RegisterPage
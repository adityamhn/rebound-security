import { Form, Input, Modal, Row, Select, message } from 'antd'
import React, { useEffect } from 'react'
import styles from "@/styles/components/Modal.module.scss"



const SessionModal = ({
    visible,
    setVisible,
    title
}) => {
    const [form] = Form.useForm();

    const closeModal = () => {
        setVisible(false)
    }


    return (
        <>
            <Modal
                open={visible}
                onCancel={closeModal}
                centered
                closeIcon={null}
                footer={null}
                className={styles.appModalContainer}
                width={600}
            >
                <div className={styles.appModalWrapper}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.heading}>{title}</h1>
                    </div>
                    <div className={styles.modalContent}>
                 {visible && (
                    Object.keys(visible).map((key) => {
                        return (
                            <Row key={key} className={styles.modalRow}>
                                <div className={styles.modalLabel}>{key}</div>
                                <div className={styles.modalValue}>{visible[key] ?? "-"}</div>
                            </Row>
                        )
                    }
                    )
                
                 )}
                 </div>
                </div>
            </Modal>
        </>
    )
}

export default SessionModal
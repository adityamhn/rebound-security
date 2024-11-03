import { Button, Dropdown, Row, Table } from 'antd'
import React from 'react'
import styles from '@/styles/components/Table.module.scss'

import moment from 'moment'

const CredentialsTable = ({ credentials }) => {

    const columns = [
        {
            title: 'S no.',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Session ID',
            dataIndex: 'session',
            key: 'session',
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (text) => <span>{moment(text).format("lll")}</span>
        },
        {
            title: 'Authenticated',
            dataIndex: 'success',
            key: 'success',
            render: (text) => <span>{text ? <span style={{ color: "#5cb85c" }}>Authenticated</span> : <span style={{ color: "#d9534f" }}>Failed</span>}</span>
        },
        // {
        //     title: '',
        //     dataIndex: 'actions',
        //     key: 'actions',
        //     width: "4rem",
        //     render: (_, record) => (<Dropdown trigger={["click"]} dropdownRender={() => <TableActionsDropdown items={attackersTableDropdownItems} record={record} />}>
        //         <div>
        //             <Button className={styles.actionsButtonContainer}>
        //                 <BsThreeDots className={styles.actionsIconButton} />
        //             </Button>
        //         </div>
        //     </Dropdown>)
        // },
    ];



    return (
        <div className={styles.resourceTableContainer}>
            <Row align="middle" justify="end" className={styles.tableFooter}>
                <div className={styles.itemsCount}><span>{credentials?.length ?? 0}</span>Credentials Found</div>
            </Row>
            <Table
                dataSource={credentials}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}

export default CredentialsTable
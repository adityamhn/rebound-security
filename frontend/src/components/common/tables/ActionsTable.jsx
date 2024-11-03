import { Row, Table } from 'antd'
import React from 'react'
import styles from '@/styles/components/Table.module.scss'

import moment from 'moment'

const ActionsTable = ({ actions }) => {

    const columns = [
        // {
        //     title: 'S no.',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Action Performed',
            dataIndex: 'input',
            key: 'input',
            render: (text) => <div style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "15rem",
                display: "block"
            }}>{text}</div>

        },
        {
            title: 'Action Success',
            dataIndex: 'success',
            key: 'success',
            render: (text) => <span>{text ? <span style={{ color: "#5cb85c" }}>Success</span> : <span style={{ color: "#d9534f" }}>Failed</span>}</span>
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
                <div className={styles.itemsCount}><span>{actions?.length ?? 0}</span>Actions</div>
            </Row>
            <Table
                dataSource={actions}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}

export default ActionsTable
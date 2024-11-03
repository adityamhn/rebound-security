import { Row, Table } from 'antd'
import React from 'react'
import styles from '@/styles/components/Table.module.scss'


const FingerprintsTable = ({ sessions }) => {

    const columns = [
        // {
        //     title: 'S no.',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
    
        {
            title: 'Session ID',
            dataIndex: 'session',
            key: 'session',
            // render: (text) => <div style={{
            //     whiteSpace: "nowrap",
            //     overflow: "hidden",
            //     textOverflow: "ellipsis",
            //     maxWidth: "15rem",
            //     display: "block"
            // }}>{text}</div>

        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            // render: (text) => <span>{text ? <span style={{ color: "#5cb85c" }}>Success</span> : <span style={{ color: "#d9534f" }}>Failed</span>}</span>
        },
        {
            title: 'Fingerprint',
            dataIndex: 'fingerprint',
            key: 'fingerprint',
            // render: (text) => <div style={{
            //     whiteSpace: "nowrap",
            //     overflow: "hidden",
            //     textOverflow: "ellipsis",
            //     maxWidth: "15rem",
            //     display: "block"
            // }}>{text}</div>

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
                <div className={styles.itemsCount}><span>{sessions?.length ?? 0}</span>Sessions</div>
            </Row>
            <Table
                dataSource={sessions}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}

export default FingerprintsTable
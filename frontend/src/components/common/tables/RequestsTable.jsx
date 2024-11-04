import { Row, Table } from 'antd'
import React from 'react'
import styles from '@/styles/components/Table.module.scss'
import SessionModal from '../modals/SessionModal'
import moment from 'moment'


const RequestsTable = ({ sessions, loading }) => {
    const [selectedSession, setSelectedSession] = React.useState(null)

    const columns = [
        // {
        //     title: 'S no.',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
    
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // render: (text) => <div style={{
            //     whiteSpace: "nowrap",
            //     overflow: "hidden",
            //     textOverflow: "ellipsis",
            //     maxWidth: "15rem",
            //     display: "block"
            // }}>{text}</div>

        },

        {
            title: 'Path',
            dataIndex: 'path',
            key: 'path',
            // render: (text) => <div style={{
            //     whiteSpace: "nowrap",
            //     overflow: "hidden",
            //     textOverflow: "ellipsis",
            //     maxWidth: "15rem",
            //     display: "block"
            // }}>{text}</div>

        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            // render: (text) => <span>{text ? <span style={{ color: "#5cb85c" }}>Success</span> : <span style={{ color: "#d9534f" }}>Failed</span>}</span>
        },
        {
            title: 'IP Address',
            dataIndex: 'user_ip',
            key: 'user_ip',
            // render: (text) => <span>{text ? <span style={{ color: "#5cb85c" }}>Success</span> : <span style={{ color: "#d9534f" }}>Failed</span>}</span>
        },
        {
            title: 'Headers',
            dataIndex: 'headers',
            key: 'headers',
            render: (text) => <div style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "15rem",
                display: "block"
            }}>{text}</div>

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
                <div className={styles.itemsCount}><span>{sessions?.length ?? 0}</span>HTTP Requests</div>
            </Row>
            <Table
                dataSource={sessions}
                columns={columns}
                pagination={false}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setSelectedSession(record )
                        }
                    }
                }}
                loading={loading}
            />

<SessionModal visible={selectedSession} setVisible={setSelectedSession} title="HTTP Request Details" />

        </div>
    )
}

export default RequestsTable
import { Button, Dropdown, Row, Table } from 'antd'
import React from 'react'
import styles from '@/styles/components/Table.module.scss'
import TableActionsDropdown from '../dashboard/TableActionsDropdown'
import { BsThreeDots } from 'react-icons/bs'
import moment from 'moment'

const HoneypotTable = ({ honeypotTableDropdownItems, honeypots, totalHoneypots }) => {


    const columns = [
        {
            title: 'Honeypot Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Honeypot ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Honeypot Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => <span>{moment(text).format("lll")}</span>
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            width: "4rem",
            render: (_, record) => (<Dropdown trigger={["click"]} dropdownRender={() => <TableActionsDropdown items={honeypotTableDropdownItems} record={record} />}>
                <div>
                    <Button className={styles.actionsButtonContainer}>
                        <BsThreeDots className={styles.actionsIconButton} />
                    </Button>
                </div>
            </Dropdown>)
        },
    ];



    return (
        <div className={styles.resourceTableContainer}>
               <Row align="middle" justify="space-between" className={styles.tableFooter}>
                <div className={styles.itemsCount}><span>{totalHoneypots ?? 0}</span>Honeypots</div>
            </Row>
            <Table
                dataSource={honeypots}
                columns={columns}
                pagination={false}
            />
         
        </div>
    )
}

export default HoneypotTable
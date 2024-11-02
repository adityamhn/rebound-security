"use client";

import { getAllLogs } from "@/services/logs.service";
import { Table } from "antd";
import moment from "moment";
import React from "react";
import { useQuery } from "react-query";

const DashboardPage = () => {
  const { data, isLoading } = useQuery("get-logs", getAllLogs,{
    refetchInterval: 2000
  });

  const columns = [
    {
      title: 'S no.',
      dataIndex: 'sno',
      key: 'sno',
      render: (text, record, index) => record[0]
    },
    {
      title: 'Session',
      dataIndex: 'session',
      key: 'session',
      render: (text, record, index) => record[1]

    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: (text, record, index) => record[3]
  
      },
      {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
        render: (text, record, index) => record[4]
  
      },
      {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: (text, record, index) => moment(record[5]).format("DD-MM-YYYY HH:mm:ss")
  
      },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
  ];

  const actionscolumns = [
    {
      title: 'S no.',
      dataIndex: 'sno',
      key: 'sno',
      render: (text, record, index) => record[0]
    },
    {
      title: 'Session',
      dataIndex: 'session',
      key: 'session',
      render: (text, record, index) => record[1]

    },
    {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: (text, record, index) => moment(record[2]).format("DD-MM-YYYY HH:mm:ss")
  
      },
      {
        title: 'Input',
        dataIndex: 'input',
        key: 'input',
        render: (text, record, index) => record[5]
  
      },
     
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
  ];

  return <div style={{padding:"5rem"}}>
    <h3 style={{color: 'white'}}>Credentials Found</h3>
    <Table dataSource={data?.auth} columns={columns} pagination={false} />

    <h3 style={{color: 'white', marginTop:"3rem"}}>Actions Taken by Hacker</h3>
    <Table dataSource={data?.input} columns={actionscolumns} pagination={false} />
  </div>;
};

export default DashboardPage;

/**
 * @file test/List.js
 * @author maoquan(maoquan@htsc.com)
 */

import React from 'react';
import { Link } from 'dva/router';

const columns = [
    {
        title: '体征代码',
        dataIndex: 'eventTZId',
        key: 'eventTZId',
        className:'eventTZId',
        sorter: (a, b) => a.eventTZId - b.eventTZId,
    },
  {
    title: '姓名',
    dataIndex: 'id',
    key: 'id',
    className:'eventName',
    onCellClick:(record,event)=>(

        console.log(record),
      console.log(event)
    ),
    render: (id, item) => (
      <Link to={`/dashboard/analysis/detail/${id}`}>{item.eventName}</Link>
    ),
  },

  {
    title: '日期',
    dataIndex: 'dateTime',
    key: 'dateTime',
      className:'dateTime',
      sorter: (a, b) => a.dateTime.replace(/\//g, "") - b.dateTime.replace(/\//g, ""),
  },
    {
        title: '发送量',
        dataIndex: 'totalSend',
        key: 'totalSend',
        className:'totalClick',
        sorter: (a, b) => a.totalSend - b.totalSend,
    },
    {
        title: '财富通发送量',
        dataIndex: 'totalBoardcast',
        key: 'totalBoardcast',
        className:'totalClick',
        sorter: (a, b) => a.totalBoardcast - b.totalBoardcast,
    },
    {
        title: '到达总量',
        dataIndex: 'totalRecv',
        key: 'totalRecv',
        className:'totalClick',
        sorter: (a, b) => a.totalRecv - b.totalRecv,
    },
    {
        title: '点击总量',
        dataIndex: 'totalClick',
        key: 'totalClick',
        className:'totalClick',
        
        sorter: (a, b) => a.totalClick - b.totalClick,
    }

];

export default columns;

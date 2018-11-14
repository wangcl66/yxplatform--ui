/**
 * @file test/List.js
 * @author maoquan(maoquan@htsc.com)
 */
import React, {  PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { Table,Pagination,Spin } from 'antd';

import columns from './columns';
import './list.less';


export default class TestList extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
  }

  static defaultProps = {
  }




  render() {
    const { list } = this.props;
    return (
    <div>
        <Table
            pagination = {false}
            columns={columns}
            dataSource={list}
            size="middle"
        />
      <div className="Pagination">
        <Pagination showSizeChanger onShowSizeChange={this.props.onShowSizeChange} defaultCurrent={1} total={500} />
      </div>

    </div>


    );
  }
}

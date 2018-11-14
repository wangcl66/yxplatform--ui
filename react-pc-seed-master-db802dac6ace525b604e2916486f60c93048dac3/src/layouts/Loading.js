/**
 * @fileOverview layouts/Loading.js
 * @author sunweibin
 */

import React, { PropTypes } from 'react';
import { Spin } from 'antd';
import { getCssStyle } from '../utils/helper';
import styles from './Loading.less';
import './Loading.less'
// 首先判断wrap存在与否
const contentWrapper = document.getElementById('workspace-content');

function Loading({ loading, forceFull }) {
  if (!loading) {
    return null;
  }

  // 新增判断如果forceFull有值，则需要判断是Y或者N，
  // 无值则按默认的方式处理

    // 强制全屏
   let top = '0';
  let  left = '0';

  return (
    <div
       className="popmask"
     /* className={styles.popmask}*/
     /* style={{ top, left }}*/
    >
      <Spin tip="Loading" spinning={loading} />
    </div>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
 /* forceFull: PropTypes.bool.isRequired,*/
};

export default Loading;

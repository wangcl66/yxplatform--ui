/**
 * Created by linkage on 2018/5/28.
 */
import React, { PropTypes, PureComponent } from 'react';
import {Row,Col,Input } from 'antd';
import './layout.less';

export default class Work extends PureComponent {


    render() {
        return(
            <div className="utter-example">
                <Row gutter={16}>
			      <Col className="gutter-row" span={6}>
			        姓名：<Input/>
			      </Col>
			      <Col className="gutter-row" span={6}>
			        年龄：<Input/>
			      </Col>
			      <Col className="gutter-row" span={6}>
			        性别：<Input/>
			      </Col>
			     
			    </Row>
            </div>
        );
    }
}




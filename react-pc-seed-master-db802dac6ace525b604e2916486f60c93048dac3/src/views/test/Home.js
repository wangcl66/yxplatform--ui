/**
 * @file test/Home.js
 *  xx首页
 * @author maoquan(maoquan@htsc.com)
 */

import { Button } from  'antd';
import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import {routerRedux} from 'dva/router';
import  $  from 'jquery';
import _ from 'lodash'
import { autobind } from 'core-decorators';

import Filter from '../../components/filter/Filter';
import List from '../../components/test/List';
import './home.less';

// 只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
// 该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。
const mapStateToProps = state => ({
  list: state.test.datas,
});

//如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，
// 而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中
const mapDispatchToProps = {
  getList: query => ({
    type: 'test/getList',
    payload: query || {},
  }),
    push: routerRedux.push,
    replace: routerRedux.replace,
};
@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends PureComponent {
    state = {
        name:''
    }

    constructor(props) {
        super(props);
        this.state = {
            filterText: ''
        };
    }
    static propTypes = {
        title: PropTypes.string,
        getList: PropTypes.func.isRequired,
        list: PropTypes.array,
        replace: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
    }

  static defaultProps = {
    title: 'xx首页',
    list: [],
      orderType:''
  }

    componentWillMount() {
        const { list, location: { query } } = this.props;
        if (_.isEmpty(list)) {
            this.props.getList({
                ...query,
                ..._.omit(this.params, function (value, key, object) {
                    return $.trim(value) == "";
                })
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { location: { query } } = nextProps;
        const { location: { query: preQuery } } = this.props;
        // 条件变化
        if (!_.isEqual(query, preQuery)) {
            this.props.getList({
                ...query,
                ..._.omit(this.params, function (value, key, object) {
                return $.trim(value) == "";
            })
            });

        }
    }

    clickHeader=(e)=>{
        var pageSize='', pageNum='',orderField='',orderType='',params={};
        console.log($('.eventTZId'));
        var class_name = e.currentTarget.className;
        switch (class_name){
            case 'eventTZId':
                orderField = 'eventTZId';
                this.props.orderType = this.props.orderType == 'desc'?'asc':'desc';
                break
            case 'eventName':
                orderField = 'eventName';
                break
            case 'dateTime':
                orderField = 'dateTime';
                break
            case 'totalSend':
                orderField = 'totalSend';
                break
            case 'totalBoardcast':
                orderField = 'totalBoardcast';
                break
            case 'totalRecv':
                orderField = 'totalRecv';
                break
            case 'totalClick':
                orderField = 'totalClick';
                break
            default:
                orderField = '';
        }
        params={
            'pageSize':5,
            'pageNum':1,
            'orderField':orderField,
            'orderType':orderType,
        };
        this.props.getList(params);

    }
  componentDidMount(){
        var headers = document.querySelectorAll('.page-test-home th');
        headers.forEach((item,index) =>{
            headers[index].addEventListener("click",this.clickHeader);
        });

  }
    handleInput=(e)=>{
        this.setState({filterText: e.target.nextSibling.value});
    }
    onShowSizeChange=(current, pageSize)=> {
        console.log(current, pageSize);
        this.props.getList({
            'pageSize':pageSize,
            'pageNum':current,
        });
    }
    @autobind
    onOpenChange() {
        this.setState({ open: !this.state.open });
    }
    _download(format,ev){

  debugger
        var contents = format ==='json' ? JSON.stringify(this.props.list)
        : this.props.list.reduce(function(result,row){
            return result + _.values(row).reduce(function(rowresult,cell,idx){
                return rowresult + ''
                +cell.replace(/"/g,'""')
                +','
                +(idx <row.length - 1 ?',' : '');
            },'')
            + "\n";

        },'');
        var URL = window.URL || window.webkitURL;
        var blob = new Blob([contents],{type:'text/' + format});
        ev.target.href = URL.createObjectURL(blob);
        ev.target.download = 'data.' + format;


    }

    /**
     * s刷新
     */
    @autobind
    searchList(){
        this.props.getList({
            ..._.omit(this.params, function (value, key, object) {
                return $.trim(value) == "";
            })
        });
    }

  render() {
    const {
        list,
        location,
        replace,
        push,
    } = this.props;
      const rows = [];
      list.forEach((item) => {
          if (item.eventName.indexOf(this.state.filterText) === -1) {
              return;
          }
          rows.push(item);
      });

    return (
    <div>
      <Filter filterText={this.state.filterText}
              onOpenChange={this.onOpenChange}
              searchBy={this.handleInput}
              location={location}
              replace={replace}/>
      <a onClick={this._download.bind(this,'json')}
         href='data.json'
      >下载json</a>
      <div className="page-test-home">
      <Button onClick={this.searchList}
      >刷新</Button>
        <List list={rows} onShowSizeChange={this.onShowSizeChange}/>
      </div>
    </div>

    );
  }
}


/**
 * @file layouts/Frame.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, {Component, PropTypes} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {withRouter, Link} from 'dva/router';
import {connect} from 'react-redux';
import { autobind } from 'core-decorators';

import {getNavData} from '../common/nav';

import '../css/main.less';
import Loading from './Loading';
import './Frame.less';
debugger

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const mapStateToprops = state => ({
    loading: state.activity.global,
});
const mapDispatchToprops = {};
@connect(mapStateToprops, mapDispatchToprops)
@withRouter
export default class Frame extends Component {
    constructor(props) {
        super(props);
        debugger
        // 把一级 Layout 的 children 作为菜单项
        this.menus = getNavData().reduce((arr, current) => arr.concat(current.children), []);
        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props),
            collapsed:false
        };

    }


    static propTypes = {
        children: PropTypes.node.isRequired,
        // loading: PropTypes.bool.isRequired,
    }

    static defaultProps = {}

    /**
     *
     * @param props
     * @returns {*}
     */
    @autobind
    getDefaultCollapsedSubMenus(props) {
        const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
        currentMenuSelectedKeys.splice(-1, 1);
        if (currentMenuSelectedKeys.length === 0) {
            return ['dashboard'];
        }
        return currentMenuSelectedKeys;
    }

    /**
     *
     * @param props
     * @returns {*}
     */
    @autobind
    getCurrentMenuSelectedKeys(props) {
        const {location: {pathname}} = props || this.props;
        const keys = pathname.split('/').slice(1);
        if (keys.length === 1 && keys[0] === '') {
            return [this.menus[0].key];
        }
        return keys;
    }

    /**
     *
     * @param menusData
     * @param parentPath
     * @returns {Array}
     */
    @autobind
    getNavMenuItems(menusData, parentPath = '') {
        if (!menusData) {
            return [];
        }
        return menusData.map((item) => {
            if (!item.name) {
                return null;
            }
            let itemPath;
            if (item.path.indexOf('http') === 0) {
                itemPath = item.path;
            } else {
                itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
            }
            if (item.children && item.children.some(child => child.name)) {
                return (
                    <SubMenu
                        title={
                            item.icon ? (
                                    <span>
                  <Icon type={item.icon}/>
                  <span>{item.name}</span>
                </span>
                                ) : item.name
                        }
                        key={item.key || item.path}
                    >
                        {this.getNavMenuItems(item.children, itemPath)}
                    </SubMenu>
                );
            }
            const icon = item.icon && <Icon type={item.icon}/>;
            return (
                <Menu.Item key={item.key || item.path}>
                    {
                        /^https?:\/\//.test(itemPath) ? (
                                <a href={itemPath} target={item.target}>
                                    {icon}<span>{item.name}</span>
                                </a>
                            ) : (
                                <Link to={itemPath} target={item.target}>
                                    {icon}<span>{item.name}</span>
                                </Link>
                            )
                    }
                </Menu.Item>
            );
        });
    }

    /**
     *
     * @param openKeys
     */
    @autobind
    handleOpenChange(openKeys){
        const lastOpenKey = openKeys[openKeys.length - 1];
        const isMainMenu = this.menus.some(
            item => (item.key === lastOpenKey || item.path === lastOpenKey)
        );
        this.setState({
            openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
        });
    }

    /**
     *
     */
    @autobind
    toggle(){
        this.setState({
            collapsed:!this.state.collapsed
        });
    }


    render() {
        const {children/** , location, loading = false*/, loading} = this.props;
        const { collapsed } = this.state;
        const menuProps = collapsed ? {} : {
                openKeys: this.state.openKeys,
            };
        return (
            <Layout>
                {/*<Header className="header">
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">头部导航 1</Menu.Item>
                        <Menu.Item key="2">头部导航 2</Menu.Item>
                        <Menu.Item key="3">头部导航 3</Menu.Item>
                    </Menu>
                </Header>*/}
                <Layout>
                   {/* <Sider width={200} style={{background: '#fff'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['2']}
                            defaultOpenKeys={['1']}
                            style={{height: '100%'}}
                        >
                            /!*<SubMenu key="1" title={<span><Icon type="user" />营销活动</span>}>*!/
                            <Menu.Item key="1"><Link to="/work"><Icon type="user"/>工作台</Link></Menu.Item>
                            /!*<Menu.Item key="12"><Link to="/test1">子菜单二</Link></Menu.Item>*!/
                            /!*</SubMenu>*!/
                            /!*<SubMenu key="2" title={<span><Icon type="laptop" />菜单二</span>}>*!/
                            <Menu.Item key="2"><Link to="/test"><Icon type="user"/>营销活动</Link></Menu.Item>
                            /!*<Menu.Item key="22">子菜单二</Menu.Item>*!/
                            /!*</SubMenu>*!/
                            /!*<SubMenu key="3" title={<span><Icon type="laptop" />菜单二</span>}>*!/
                            <Menu.Item key="3"><Link to="/work"><Icon type="user"/>统计分析</Link></Menu.Item>
                            /!*<Menu.Item key="22"><Icon type="user" 子菜单二</Menu.Item>*!/
                            /!*</SubMenu>*!/
                            /!*<SubMenu key="4" title={<span><Icon type="laptop" />菜单二</span>}>*!/
                            <Menu.Item key="4"><Link to="/work"><Icon type="user"/>活动审核</Link></Menu.Item>
                            /!*<Menu.Item key="22">子菜单二</Menu.Item>*!/
                            /!*</SubMenu>*!/
                        </Menu>
                    </Sider>*/}
                    <Sider
                        trigger={null}
                        breakpoint="md"
                        collapsible
                        collapsed={this.state.collapsed}
                        width={256}
                        className="sider"
                    >
                        <div className="logo">
                            <Link to="/">
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/iwWyPinUoseUxIAeElSx.svg" alt="logo" />
                                <h1>Ant Design Pro</h1>
                            </Link>
                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            {...menuProps}
                            onOpenChange={this.handleOpenChange}
                            selectedKeys={this.getCurrentMenuSelectedKeys()}
                            style={{ margin: '16px 0', width: '100%' }}
                        >
                            {this.getNavMenuItems(this.menus)}
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Header className="header">
                            <Icon
                                className="trigger"
                                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Header>
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                            {children}
                        </Content>
                    </Layout>
                </Layout>
                {/*<ActivityIndicator toast animating={loading} text="正在加载" />*/}
                <Loading loading={loading}/>

            </Layout>
        );
    }
}

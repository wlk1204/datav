import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import styles from './index.less';

/* eslint-disable */
const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class MainLayout extends React.Component {

  state = {
    collapsed: false,
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Header className={styles.title}>
            <div className={styles.avator} />{!this.state.collapsed && <span>Demo</span>}
          </Header>
          <Menu defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><Icon type="pie-chart" /><span>d3</span></span>}
            >
              <Menu.Item key="1"><Link to='/d3/barchart'>barchart</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/d3/piechart'>piechart</Link></Menu.Item>
              <Menu.Item key="3"><Link to='/d3/linechart'>linechart</Link></Menu.Item>
              <Menu.Item key="100"><Link to='/d3/canvas'>canvas</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="global" /><span>three</span></span>}
            >
              <Menu.Item key="4"><Link to='/three/basic'>basic</Link></Menu.Item>
              <Menu.Item key="5"><Link to='/three/next'>next</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="line-chart" /><span>recharts</span></span>}
            >
              <Menu.Item key="6"><Link to='/recharts/basic'>basic</Link></Menu.Item>
              <Menu.Item key="7"><Link to='/recharts/linechart'>linechart</Link></Menu.Item>
              <Menu.Item key="8"><Link to='/recharts/barchart'>barchart</Link></Menu.Item>
              <Menu.Item key="9"><Link to='/recharts/areachart'>areachart</Link></Menu.Item>
              <Menu.Item key="10"><Link to='/recharts/piechart'>piechart</Link></Menu.Item>
              <Menu.Item key="11"><Link to='/recharts/radarchart'>radarchart</Link></Menu.Item>
              <Menu.Item key="12"><Link to='/recharts/others'>others</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="20">
              <Link to='/user'>
              <Icon type="user" />
              <span>user</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div id="content" style={{ padding: 24, background: '#fff', minHeight: 700 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Personal ©2018 Created by wanglk
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout;

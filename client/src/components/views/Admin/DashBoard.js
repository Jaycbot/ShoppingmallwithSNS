import React from 'react'
import { Layout, Menu, Row } from 'antd';
import { DashboardOutlined, UserOutlined, 
          ShopOutlined, SolutionOutlined } from '@ant-design/icons';
import DashBordIcon from './Sections/DashBordIcon';
import SellerInfo from './Sections/SellerInfo';
import DashBoardGraph from './Sections/DashBoardGraph';
import UserRatio from './Sections/UserRatio';

const { Header, Content, Sider } = Layout;


function DashBoard() {

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
                <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoi nt={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <a href='/admin'>대시보드</a>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                    <a href='/admin/user'>사용자</a>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ShopOutlined />}>
                    <a href='/admin/product'>상품</a>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<SolutionOutlined />}>
                    <a href='/admin/sns'>SNS 게시물</a>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                      <DashBordIcon />
                      <br/><br/><br/>
                      
                      <Row justify="space-around">
                        <DashBoardGraph/>
                        <br/><br/><br/>
                        <UserRatio/>
                      </Row>
                  
                      <SellerInfo/>

                    </div>
                    
                </Content>
                </Layout>
            </Layout>
    </div>
  )
}

export default DashBoard

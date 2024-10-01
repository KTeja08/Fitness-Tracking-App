import React from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, SlackSquareOutlined, RetweetOutlined, FundOutlined } from '@ant-design/icons';
import UserAvatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ userName }) => (
  <Sider width={210} style={{ height: '100vh', position: 'fixed', left: 0 }}>
    <div className="sidebar-content">
      <UserAvatar />
      <div className="user-info">
        {/* <strong>{userName}</strong> */}
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SlackSquareOutlined />}>
          <Link to="/workout">Workout</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<RetweetOutlined />}>
          <Link to="/activity">Activity</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FundOutlined />}>
          <Link to="/goal">Goal</Link>
        </Menu.Item>
      </Menu>
    </div>
  </Sider>
);

export default Sidebar;

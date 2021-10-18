import { Menu } from 'antd';
import Styles from './BottomNavbar.module.scss';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const BottomNavBar = (props) => {
  return (
    <div className={Styles.bottomNav}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="horizontal">
        <Menu.Item key="1" className={Styles.bnTab} icon={<PieChartOutlined />}>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="2" className={Styles.bnTab} icon={<UserOutlined />}>
          <Link to="/about" />
        </Menu.Item>
        <Menu.Item key="3" className={Styles.bnTab} icon={<TeamOutlined />}>
          <Link to="/mentor" />
        </Menu.Item>
        <Menu.Item key="4" className={Styles.bnTab} icon={<DesktopOutlined />}>
          <Link to="/dynamite-sessions" />
        </Menu.Item>
        <Menu.Item key="5" className={Styles.bnTab} icon={<FileOutlined />}>
          <Link to="/requests" />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default BottomNavBar;

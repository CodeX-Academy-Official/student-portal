import { Menu } from 'antd';
import Styles from './BottomNavbar.module.scss';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const BottomNavBar = (props) => {
  return (
    <div className={Styles.bottomNav}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="horizontal">
        <Menu.Item
          key="Overview"
          className={Styles.bnTab}
          icon={<PieChartOutlined />}
        ></Menu.Item>
        <Menu.Item
          key="About"
          className={Styles.bnTab}
          icon={<UserOutlined />}
        ></Menu.Item>
        <Menu.Item
          key="Mentor"
          className={Styles.bnTab}
          icon={<TeamOutlined />}
        ></Menu.Item>
        <Menu.Item
          key="Dynamite Sessions"
          className={Styles.bnTab}
          icon={<DesktopOutlined />}
        ></Menu.Item>
        <Menu.Item
          key="Requests"
          className={Styles.bnTab}
          icon={<FileOutlined />}
        ></Menu.Item>
      </Menu>
    </div>
  );
};

export default BottomNavBar;

import styled from 'styled-components';
import { Layout as _Layout, Menu as _Menu } from 'antd';

export const Layout = styled(_Layout)`
  min-height: 100vh;
  margin: 0;
  background: green;
`;

export const LayoutSider = styled(_Layout.Sider)`
  background-color: gray;
  display: block;
  left: 0
  position: absolute;
`;

export const TopLayout = styled(_Layout)`
  position: relative;
  width: 100%;
`;

export const Content = styled(_Layout.Content)`
  background-color: lightgray;
`;

export const Header = styled(_Layout.Header)`
  background-color: #1b5098;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SubMenu = styled(_Menu.SubMenu)`
  background-color: #124080;
  color: white;
`;

export const SubLayout = styled(_Layout)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1 0 70%;
  right: 0;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

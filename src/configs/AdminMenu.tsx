import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export const adminMenus = [
  {
    label: (
      <NavLink to="/admin" className="text-white">
        Dashboard
      </NavLink>
    ),
    key: '1',
    icon: <PieChartOutlined />,
  },
  {
    label: <p>Danh mục</p>,
    key: '2',
    icon: <FileOutlined />,
    children: [
      {
        label: <NavLink to="/admin/category">Danh sách</NavLink>,
        key: '3'
      },
      {
        label: <NavLink to="/admin/category/add">Thêm mới</NavLink>,
        key: '4'
      },
    ],
  },
  {
    label: (
      <NavLink to="product" className="text-white">
        Sản phẩm
      </NavLink>
    ),
    key: '5',
    icon: <DesktopOutlined />,
    children: [
      {
        label: <NavLink to="/admin/product">Danh sách</NavLink>,
        key: '6'
      },
      {
        label: <NavLink to="/admin/product/add">Thêm mới</NavLink>,
        key: '7'
      },
    ],
  },
  {
    label: (
      <NavLink to="order" className="text-white">
        Đơn hàng
      </NavLink>
    ),
    key: '8',
    icon: <ShoppingCartOutlined />,
    children: [
      {
        label: <NavLink to="/admin/order">Danh sách</NavLink>,
        key: '9'
      },
    ],
  },
  {
    label: (
      <NavLink to="order" className="text-white">
        Banner
      </NavLink>
    ),
    key: '10',
    icon: <PictureOutlined />,
    children: [
      {
        label: <NavLink to="/admin/banner">Danh sách</NavLink>,
        key: '11'
      },
      {
        label: <NavLink to="/admin/banner/add">Thêm mới</NavLink>,
        key: '12'
      },
    ],
  },
];

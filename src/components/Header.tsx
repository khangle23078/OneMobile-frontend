import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import Logo from './../assets/OneMobile.png';
import { useGetCategoriesQuery } from '@/app/services/category';
import { Category } from '@/interfaces/product';
import { useAppSelector } from '@/hooks/hook';
import SearchBar from './SearchBar';
import UserDropdown from './UserDropdown';

const Header: React.FC = () => {
  const { email } = useAppSelector((state) => state.auth)
  const { data: response } = useGetCategoriesQuery();
  const { quantity } = useAppSelector((state) => state.cart)

  const items: MenuProps['items'] = response?.data.map((category: Category, index: number) => {
    return {
      label: (
        <Link to={`/category/${category._id}`}>{category.name}</Link>
      ),
      key: `${index + 1}`
    }
  })

  return <header className='h-[100px] shadow-md'>
    <div className='h-screen mx-auto max-w-7xl'>
      <div className='flex items-center justify-around'>
        <div className='flex items-center gap-4'>
          <Link to={'/'}>
            <img src={Logo} width={100} height={100} />
          </Link>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button type='dashed' icon={<MenuOutlined />}>Danh mục</Button>
          </Dropdown>
        </div>
        <SearchBar />
        <div className='flex items-center gap-4'>
          <Link to={'/cart'}>
            <Badge count={quantity} showZero>
              <ShoppingCartOutlined className='text-3xl' />
            </Badge>
          </Link>
          {email ? <UserDropdown />
            : <Link to={'/login'}>
              <Button type='primary'>Đăng nhập</Button>
            </Link>
          }
        </div>
      </div>
    </div>
  </header>;
};

export default Header;

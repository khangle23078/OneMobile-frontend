import { useDeleteBannerMutation, useGetBannersQuery } from '@/app/services/banner'
import { Banner } from '@/interfaces/banner'
import { Button, Card, Image, Popconfirm, Space, Table, Typography, message } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const { Title } = Typography

const BannerList: React.FC = () => {
  const { data: response, isLoading } = useGetBannersQuery()
  const [deleteBanner] = useDeleteBannerMutation()

  const handleDeleteBanner = async (_id: string) => {
    try {
      const response = await deleteBanner(_id).unwrap()
      message.success(response.message)
    } catch (error: unknown) {
      message.error(error as string)
    }
  }

  const comlumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => {
        return <Image src={image} width={100} height={100} />
      }
    },
    {
      title: 'Link sản phẩm',
      dataIndex: 'product_link',
      key: 'product_link'
    },
    {
      title: 'Thao tác',
      dataIndex: '_id',
      key: 'action',
      render: (_id: string) => {
        return <>
          <Space>
            <Link to={`/admin/banner/edit/${_id}`}>
              <Button type='dashed'>Sửa</Button>
            </Link>
            <Popconfirm
              title='Bạn có chắc muốn xóa không?'
              okText='Xóa'
              cancelText='Không'
              onConfirm={() => handleDeleteBanner(_id)}>
              <Button type='primary' danger>Xóa</Button>
            </Popconfirm>
          </Space>
        </>
      }
    }
  ]

  const dataSource = response?.data.map((banner: Banner, index: number) => {
    return {
      id: index + 1,
      _id: banner._id,
      image: banner.image?.url,
      product_link: banner.product_link
    }
  })


  return (
    <Card>
      <Title level={4}>Danh sách banner</Title>
      <Table columns={comlumns} dataSource={dataSource} loading={isLoading} rowKey={'_id'} />
    </Card>
  )
}

export default BannerList
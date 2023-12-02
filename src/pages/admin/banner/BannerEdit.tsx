import { useEditBannerMutation, useGetBannerQuery } from '@/app/services/banner'
import { useDeleteFileMutation } from '@/app/services/upload'
import { useAppSelector } from '@/hooks/hook'
import { Iimage } from '@/interfaces/image'
import { Button, Form, Image, Input, Typography, Upload, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UploadOutlined } from '@ant-design/icons'
import { Banner } from '@/interfaces/banner'

const { Title } = Typography

const BannerEdit: React.FC = () => {
  const { id } = useParams()
  const [imageUrl, setImageUrl] = useState<Iimage | null>(null);
  const navigate = useNavigate()
  const { accessToken } = useAppSelector((state) => state.auth)
  const { data: response } = useGetBannerQuery(id)
  const [deleteImage] = useDeleteFileMutation()
  const [editBanner, { isLoading }] = useEditBannerMutation()
  const [form] = useForm()

  useEffect(() => {
    if (response) {
      const banner = response.data;
      form.setFieldsValue({
        product_link: banner.product_link,
        image: banner.image
      })
    }

    return () => {
      form.resetFields()
    }
  }, [form, response])

  const handleRemoveImage = async (public_id: string | undefined) => {
    try {
      const response = await deleteImage({ public_id }).unwrap();
      message.success(response?.message)
    } catch (error: unknown) {
      message.success(error as string)
    }
  }
  
  const handleEditBanner = async (data: Partial<Banner>) => {
    try {
      const response = await editBanner({ id, data }).unwrap()
      message.success(response.message)
      navigate('/admin/banner')
    } catch (error: unknown) {
      message.error(error as string)
    }
  }


  return (
    <>
      <Title level={4}>Sửa banner</Title>
      <Form layout='vertical' form={form} onFinish={handleEditBanner}>
        <Form.Item
          label="Ảnh sản phẩm"
          name='image'
          getValueFromEvent={(event) => {
            const image = event?.fileList[0]?.response?.image;
            setImageUrl(image)
            return image;
          }}>
          <Upload
            name='image'
            action="https://onemobie.onrender.com/api/v1/file/upload"
            headers={{
              Authorization: `Bearer ${accessToken}`
            }}
            onRemove={() => handleRemoveImage(imageUrl?.public_id)}
          >
            <Button icon={<UploadOutlined />}>Thêm ảnh</Button>
          </Upload>
        </Form.Item>
        <div>
          {form.getFieldValue('image') ? <Image src={form.getFieldValue('image')?.url} width={300} height={300} /> : null}
        </div>
        <Form.Item label='Link sản phẩm' name='product_link'>
          <Input />
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>Sửa</Button>
      </Form>
    </>
  )
}

export default BannerEdit
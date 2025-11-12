import React, { useEffect, useState} from 'react'
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker} from 'antd'
import './user.css'
import { getUser, addUser, editUser, delUser, getData } from '../../api'
import dayjs from 'dayjs'

const User = () => {
  const [ listData, setListData ] = useState({
    name: ''
  })
  const [ tableData, setTableData] = useState([])
  //0 add 1 edit
  const [ modalType, setModalType] = useState(0)
  const [ isModalOpnen, setisModalOpen] = useState(false)
  //create form
  const [form] = Form.useForm();
  //add
  const handleClick = (type, rowData) => {
      setisModalOpen(!isModalOpnen)
      if (type == 'add') {
        setModalType(0)
      } else {
        setModalType(1)
        const cloneData = JSON.parse(JSON.stringify(rowData))
        cloneData.birth = dayjs(cloneData.birth)
        //fill back the form
        form.setFieldsValue(cloneData)
      }
  }
  //submit
  const handleFinish = (e) => {
    setListData({
      name: e.keyword
    })
  }
  useEffect(() => {
    getTableData()
  }, [listData])

  //Delete
  const handleDelete = ({id}) => {
      delUser({ id }).then(() => {
        getTableData()
      })
  }

  const getTableData = () => {
      getUser(listData).then(({data})=> {
        //console.log(res, 'res')
        setTableData(data.list)
      })
  }
  //popwindow opne
  const handleOk = () => {
      //check form
      form.validateFields().then((val) => {
        //date 
        val.birth = dayjs(val.birth).format('YYYY-MM-DD')
        if (modalType) {
          editUser(val).then(() => {
            handleCancel()
            getTableData()
          })
        } else {
          addUser(val).then(() => {
            handleCancel()
            getTableData()
          })
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  //popwindow close
  const handleCancel = () => {
      setisModalOpen(false)
      form.resetFields()
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Gender',
      dataIndex: 'sex',
      render: (val) => {
        return val ? 'Female' : 'Male'
      }
    },
    {
      title: 'Birth',
      dataIndex: 'birth'
    },
    {
      title: 'Address',
      dataIndex: 'addr'
    },
    {
      title: 'Operate',
      render: (rowData) => {
        return (
          <div className="flex-box">
              <Button style={{marginRight: '5px'}} onClick={() => handleClick('edit', rowData)}>Edit</Button>
              <Popconfirm
                title="Warning!"
                description="Are you sure you want to delete this user?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDelete(rowData)}
              >
                <Button type="primary" danger>Delete</Button>
              </Popconfirm>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
      getTableData()
  }, [])

  return (
    <div className='user'>
        <div className="flex-box space-between">
            <Button type="primary" onClick={() => handleClick('add')}>+Add</Button>
            <Form
              layout="inline"
              onFinish={handleFinish}
            >
              <Form.Item name="keyword">
                <Input placeholder='Please enter your username'/>
              </Form.Item>
              <Form.Item>
                <Button htmlType='submit' type="primary">Search</Button>
              </Form.Item>
            </Form>
        </div>
        <Table style={{marginTop: '10px'}} columns={columns} dataSource={tableData} rowKey={'id'}/>
        <Modal
          open={isModalOpnen}
          title={ modalType ? "Edit User" : "New User"}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          
          <Form
            form={form}
            labelCol={{
              span: 6
            }}
            wrapperCol={{
              span: 18
            }}
            labelAlign="left"
          >
              { modalType == 1 &&
                <Form.Item
                  name='id'
                  hidden
                >
                  <Input />
                </Form.Item>
              }
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the name'
                  }
                ]}
              >
                  <Input placeholder='Please enter your name'/>
              </Form.Item>
              <Form.Item
                label="Age"
                name="age"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your age'
                  },
                  {
                    type: 'number',
                    message: 'Must be number'
                  }
                ]}
              >
                  <InputNumber placeholder='Please enter your age'/>
              </Form.Item>
              <Form.Item
                label="Gender"
                name="sex"
                rules={[
                  {
                    required: true,
                    message: 'Please select your gender'
                  }
                ]}
              >
                  <Select 
                    placeholder='Please select your gender'
                    options={[
                      {value: 0, label: 'Male'},
                      {value: 1, label: 'Female'}
                    ]}
                  />
              </Form.Item>
              <Form.Item
                label="Birth"
                name="birth"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your birth'
                  }
                ]}
              >
                  <DatePicker placeholder='Please enter your birth' format="YYYY/MM/DD"/>
              </Form.Item>
              <Form.Item
                label="Address"
                name="addr"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your address'
                  }
                ]}
              >
                  <Input placeholder='Please enter your address'/>
              </Form.Item>
          </Form>
        </Modal>
    </div>
  )
}

export default User
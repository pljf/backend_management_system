import React from 'react'
import { Button, Layout, Avatar, Dropdown} from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.css'
import { useDispatch } from 'react-redux'
import { collapseMenu } from '../../store/reducers/tab'
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
  const navigate = useNavigate()
  //log out
  const logout = () => {
    //Delete token
    localStorage.removeItem('token')
    navigate('/login')
  }
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Personal Center
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => logout()} target="_blank" rel="noopener noreferrer">
          Log out
        </a>
      )
    }
  ];
  //create dispatch
  const dispatch = useDispatch()

  //click 
  const setCollapsed = () => {
    console.log(collapsed)
    dispatch(collapseMenu())
  }


  return (
    <Header className="header-container">
      <Button
        type="text"
        icon ={ <MenuFoldOutlined />}
        style={{
          fontSize: '16px',
          width: 64,
          height: 32,
          backgroundColor: '#fff'
        }}
        onClick={() => setCollapsed() }
      />
      <Dropdown
          menu={{items}}
      >
        <Avatar size={36} src={<img src={require("../../assets/image/0.jpg")}/>}/>
      </Dropdown>
    </Header>
  )
}

export default CommonHeader
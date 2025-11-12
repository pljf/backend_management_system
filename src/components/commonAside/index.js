import React from 'react'
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { selectMenuList } from '../../store/reducers/tab';

import { Button, Layout, Menu, theme } from 'antd';


const { Header, Sider, Content } = Layout;

//dynamic change icon
const iconToElement = (name) => React.createElement(Icon[name])

//Handle the content
const items = MenuConfig.map((icon) => {
    //if no children
    const child = {
      key: icon.path,
      icon: iconToElement(icon.icon),
      label: icon.label
    }
    //if have children
    if(icon.children) {
      child.children = icon.children.map(item=> {
        return {
          key: item.path,
          label: item.label
        }
      })
    }
    return child
})

const CommonAside = ({ collapsed }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const setTabsLsit = (val) => {
    dispatch(selectMenuList(val))
  }
  //click menu
  const selectMenu = (e) => {
    let data
    MenuConfig.forEach(item => {
      //find current data
      if(item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item
        if(e.keyPath.length > 1) {
          data = item.children.find(child => {
            return child.path == e.key
          })
        }
      }
    })
    setTabsLsit({
      path: data.path,
      name: data.name,
      label: data.label
    })
    navigate(e.key)
  }

  return (
  <Sider trigger={null} collapsed={collapsed}>
      <div className="demo-logo-vertical">{collapsed ? 'Control' : ' General Back-end Management'}</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{
          height: '100%'
        }}
        onClick={selectMenu}
      />
    </Sider>
  )
}

export default CommonAside
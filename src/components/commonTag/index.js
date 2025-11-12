import React from 'antd'
import {Tag, Space} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { closeTab, setCurrentMenu } from '../../store/reducers/tab'
import './index.css'

const CommonTag = () => {
  const tabsList = useSelector(state => state.tab.tabList)
  const currentMenu = useSelector(state => state.tab.currentMenu)
  const dispatch = useDispatch()
  const action = useLocation()
  const navigate = useNavigate()
  console.log(tabsList)
  const handleClose = (tag, index) => {
    let length = tabsList.length - 1
    dispatch(closeTab(tag))
    if(tag.path !== action.pathname) {
      return
    }
    if(index === length) {
      const curData = tabsList[index - 1]
      dispatch(setCurrentMenu(curData))
      navigate(curData.path)
    } else {
      if (tabsList.length > 1) {
        const nextData = tabsList[index + 1]
        dispatch(setCurrentMenu(nextData))
        navigate(nextData.path)
      }
    }
  }
  //click tag
  const handleChange = ( tag) => {
    dispatch(setCurrentMenu(tag))
    navigate(tag.path)
  }
  //tag display
  const setTag = (flag, item, index) => {
    return (
      flag ?
      <Tag color='#55acee' closeIcon onClose={() => handleClose(item, index)} key={item.name}>{item.label}</Tag>
      :
      <Tag onClick={() => handleChange(item)} key={item.name}>{item.label}</Tag>
    )
  }
  return (
    <Space className="common-tag" size={[0,8]} wrap>
        {/* <Tag>Home</Tag>
        <Tag color='#55acee' closeIcon onClose={() => handleClose()}>
          User List
        </Tag> */}
        { 
          currentMenu.name && tabsList.map((item, index) => (setTag(item.path === currentMenu.path, item, index)))
        }
    </Space>
  )
}

export default CommonTag
import React from "react"
import {Form, Input, Button, message} from 'antd'
import "./login.css"
import { getMenu } from "../../api"
import { useNavigate, Navigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  ////Jump to home after login
  if(localStorage.getItem('token')) {
    return <Navigate to="/home" replace/>
  }
  const handleSubmit = (val) => {
    if (!val.password || !val.username) {
      return message.open({
        type: 'warning',
        content: "Please enter your username and password"
      })
    }
    getMenu(val).then(({ data }) => {
      console.log(data)
      localStorage.setItem('token', data.data.token)
      navigate('/home')
    })
  }
  return(
    <Form className="login-container" onFinish={handleSubmit}>
      <div className="login_title">System Login</div>
      <Form.Item
        label="Username"
        name="username"
      >
        <Input placeholder="Please enter your username"/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
      >
        <Input.Password placeholder="Please enter your passsword"/>
      </Form.Item>
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit">Login</Button>
      </Form.Item>
    </Form>
  )
}

export default Login
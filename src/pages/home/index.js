import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd'
import * as Icon from '@ant-design/icons'
import './home.css'
import { getData } from '../../api' 
import MyEcharts from '../../components/Echarts'

//table data
const columns = [
  {
    title: 'Phone',
    dataIndex: 'name'
  },
  {
    title: 'Day',
    dataIndex: 'todayBuy'
  },
  {
    title: 'Month',
    dataIndex: 'monthBuy'
  },
  {
    title: 'Total',
    dataIndex: 'totalBuy'
  }
]
//Data for Mall
const countData = [
  {
    "name": "Today's Paid Orders",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "Today's Collected Orders",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "Today's Unpaid Orders",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  },
  {
    "name": "This Month's Paid Orders",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "This Month's Collected Orders",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "This Month's Unpaid Orders",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  }
];

//dynamic change icon
const iconToElement = (name) => React.createElement(Icon[name])

const Home = () => {
  const userImg = require("../../assets/image/0.jpg")

  //create echart react data
  const [ echartData, setEcharData ] = useState({})
  useEffect(() => {
    getData().then(({ data }) => {
      console.log(data, 'res')
      const {tableData, orderData, userData, videoData} = data.data
      setTableData(tableData)

      //for echarts data
      const order = orderData
      const xData = order.date
      
      //series
      const keyArray = Object.keys(order.data[0])
      const series = []
      keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
      })
      setEcharData({
        order: {
          xData,
          series
        },
        user: {
          xData: userData.map(item => item.date),
          series: [
            {
               name: 'New Users',
               data: userData.map(item => item.new),
               type: 'bar'
            },
            {
               name: 'Active Users',
               data: userData.map(item => item.active),
               type: 'bar'
            }
          ]
        },
        video: {
          series: [
            {
              data: videoData,
              type: 'pie'
            }
          ]
        }
      })
    })

  }, [])

  //define table data
  const [ tableData, setTableData] = useState([])
  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
              <img src={userImg}/>
              <div className = "userinfo">
                  <p className="name">Patrick</p>
                  <p className="access">Manager</p>
              </div>
          </div>
          <div className="login-info">
            <p>Last Login Date/Time:<span>09/29/2024</span></p>
            <p>Last Login location:<span>New York</span></p>
          </div>
        </Card>
        <Card>
          <Table rowKey={"name"} columns={columns} dataSource={tableData} pagination={false}/>
        </Card>
      </Col>
      <Col span={16}>
          <div className="num">
              {
                countData.map((item, index) => {
                    return (
                      <Card key={index}>
                        <div className = "icon-box" style={{background: item.color}}>
                          { iconToElement(item.icon) }
                        </div>
                        <div className = "detail">
                          <p className="num">${item.value}</p>
                          <p classname="txt">{item.name}</p>
                        </div>
                      </Card>
                    )
                })
              }
          </div>
          { echartData.order && <MyEcharts charData={echartData.order} style={{height: '280px'}}/>}
          <div className="graph">
            { echartData.user && <MyEcharts charData={echartData.user} style={{height: '240px', width: '50%'}}/>}
            { echartData.video && <MyEcharts charData={echartData.video} isAxisChart={false} style={{height: '260px', width: '50%'}}/>}
          </div>
      </Col>
    </Row>
  )
}

export default Home
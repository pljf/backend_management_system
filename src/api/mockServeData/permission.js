import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    if (username === 'Patrick' && password === 'Patrick') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: 'Home',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/mall',
              name: 'mall',
              label: 'Mall',
              icon: 'video-play',
              url: 'mall/index'
            },
            {
              path: '/user',
              name: 'user',
              label: 'User',
              icon: 'user',
              url: 'User/index'
            },
            {
              label: 'Other',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: 'Page1',
                  icon: 'setting',
                  url: 'other/pageOne.vue'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: 'Page2',
                  icon: 'setting',
                  url: 'other/pageTwo.vue'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: 'Get Success'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: 'Home',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/video',
              name: 'video',
              label: 'Mall',
              icon: 'video-play',
              url: 'mall/index'
            }
          ],
          token: Mock.Random.guid(),
          message: 'Get Success'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: 'Password wrong!'
        }
      }
    }

  }
}
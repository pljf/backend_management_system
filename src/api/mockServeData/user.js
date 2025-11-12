import Mock from 'mockjs'


// For GET requests, extract parameters from config.url; for POST, extract from config.body
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/\+/g, ' ') 
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}


// List of U.S. states and major cities
const usLocations = [
  { city: 'New York', state: 'New York' },
  { city: 'Los Angeles', state: 'California' },
  { city: 'Chicago', state: 'Illinois' },
  { city: 'Houston', state: 'Texas' },
  { city: 'Phoenix', state: 'Arizona' },
  { city: 'Philadelphia', state: 'Pennsylvania' },
  { city: 'San Antonio', state: 'Texas' },
  { city: 'San Diego', state: 'California' },
  { city: 'Dallas', state: 'Texas' },
  { city: 'San Jose', state: 'California' },
  { city: 'Austin', state: 'Texas' },
  { city: 'Jacksonville', state: 'Florida' },
  { city: 'Fort Worth', state: 'Texas' },
  { city: 'Columbus', state: 'Ohio' },
  { city: 'Charlotte', state: 'North Carolina' },
  { city: 'San Francisco', state: 'California' },
  { city: 'Indianapolis', state: 'Indiana' },
  { city: 'Seattle', state: 'Washington' },
  { city: 'Denver', state: 'Colorado' },
  { city: 'Washington', state: 'D.C.' }
]

// Function to generate random U.S. address
function randomUSAddress() {
  const loc = usLocations[Math.floor(Math.random() * usLocations.length)]
  return `${loc.city}, ${loc.state}`
}

// Generate mock user list
let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.name(),
      addr: randomUSAddress(),  
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    })
  )
}

export default {
  getUserList: config => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    const mockList = List.filter(user => {
      if (name) {
        const keywords = name.trim().toLowerCase().split(/\s+/);
        return keywords.every(kw =>
          user.name.toLowerCase().includes(kw) ||
          user.addr.toLowerCase().includes(kw)
        );
      }
      return true;
    });


    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  
  createUser: config => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body)
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    })
    return {
      code: 20000,
      data: {
        message: 'Add Successful!'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    const { id } = JSON.parse(config.body)
    if (!id) {
      return {
        code: -999,
        message: 'Error!'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: 'Delete Successful!'
      }
    }
  },
  
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: 'Users have been deleted successfully'
      }
    }
  },
  
  updateUser: config => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.addr = addr
        u.age = age
        u.birth = birth
        u.sex = sex_num
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: 'Edit Successful!'
      }
    }
  }
}

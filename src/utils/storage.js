// 对localStorage进行二次封装
const getItem = name => {
  const data = localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    console.log(err, 'localStorage解析错误')
    return data
  }
}

const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(name, value)
}

const removeItem = name => {
  localStorage.removeItem(name)
}


export { getItem, setItem, removeItem }

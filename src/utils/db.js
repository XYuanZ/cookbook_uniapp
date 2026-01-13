// 云数据库操作封装
const db = wx.cloud.database()
const _ = db.command

// 集合列表
export const collections = {
  users: db.collection('users'),
  recipes: db.collection('recipes'),
  categories: db.collection('categories')
}

// 获取单条记录
export const getDoc = async (collection, id) => {
  try {
    const res = await collection.doc(id).get()
    return res.data
  } catch (error) {
    console.error('获取数据失败', error)
    return null
  }
}

// 获取多条记录
export const getDocs = async (collection, query = {}) => {
  try {
    let dbQuery = collection
    if (query.where) {
      dbQuery = dbQuery.where(query.where)
    }
    if (query.orderBy) {
      dbQuery = dbQuery.orderBy(query.orderBy.field, query.orderBy.direction)
    }
    if (query.limit) {
      dbQuery = dbQuery.limit(query.limit)
    }
    if (query.skip) {
      dbQuery = dbQuery.skip(query.skip)
    }
    const res = await dbQuery.get()
    return res.data
  } catch (error) {
    console.error('获取数据失败', error)
    return []
  }
}

// 添加记录
export const addDoc = async (collection, data) => {
  try {
    const res = await collection.add({
      data: {
        ...data,
        createTime: db.serverDate(),
        updateTime: db.serverDate()
      }
    })
    return res._id
  } catch (error) {
    console.error('添加数据失败', error)
    return null
  }
}

// 更新记录
export const updateDoc = async (collection, id, data) => {
  try {
    await collection.doc(id).update({
      data: {
        ...data,
        updateTime: db.serverDate()
      }
    })
    return true
  } catch (error) {
    console.error('更新数据失败', error)
    return false
  }
}

// 删除记录
export const deleteDoc = async (collection, id) => {
  try {
    await collection.doc(id).remove()
    return true
  } catch (error) {
    console.error('删除数据失败', error)
    return false
  }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 创建用户集合
    await db.createCollection('users')
    
    // 创建菜谱集合
    await db.createCollection('recipes')
    
    // 创建分类集合
    await db.createCollection('categories')
    
    // 创建分类索引
    await db.collection('categories').createIndex({ name: 1 }, { unique: true })
    
    // 创建菜谱索引
    await db.collection('recipes').createIndex({ title: 'text', description: 'text' })
    await db.collection('recipes').createIndex({ category: 1 })
    await db.collection('recipes').createIndex({ createTime: -1 })
    
    // 初始化分类数据
    const categories = [
      { name: '川菜', icon: 'chuan' },
      { name: '粤菜', icon: 'yue' },
      { name: '湘菜', icon: 'xiang' },
      { name: '鲁菜', icon: 'lu' },
      { name: '苏菜', icon: 'su' },
      { name: '浙菜', icon: 'zhe' },
      { name: '闽菜', icon: 'min' },
      { name: '徽菜', icon: 'hui' }
    ]
    
    for (const category of categories) {
      await db.collection('categories').add({
        data: {
          ...category,
          createTime: db.serverDate(),
          updateTime: db.serverDate()
        }
      })
    }
    
    return {
      success: true,
      message: '数据库初始化成功'
    }
  } catch (error) {
    console.error('数据库初始化失败', error)
    return {
      success: false,
      message: '数据库初始化失败',
      error: error.message
    }
  }
}
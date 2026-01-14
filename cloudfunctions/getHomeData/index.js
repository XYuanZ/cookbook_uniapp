// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取轮播图数据
    const bannersResult = await db.collection('banners').orderBy('sort', 'asc').get()
    
    // 获取分类数据
    const categoriesResult = await db.collection('categories').orderBy('sort', 'asc').get()
    
    // 获取推荐菜谱数据
    const recipesResult = await db.collection('recipes')
      .orderBy('createTime', 'desc')
      .limit(10)
      .get()
    
    return {
      success: true,
      data: {
        banners: bannersResult.data,
        categories: categoriesResult.data,
        recipes: recipesResult.data
      }
    }
  } catch (error) {
    console.error('获取首页数据失败', error)
    return {
      success: false,
      message: '获取首页数据失败',
      error: error.message
    }
  }
}
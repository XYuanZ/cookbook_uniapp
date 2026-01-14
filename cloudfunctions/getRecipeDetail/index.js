// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { id } = event
    
    if (!id) {
      return {
        success: false,
        message: '菜谱ID不能为空'
      }
    }
    
    // 获取菜谱详情数据
    const recipeResult = await db.collection('recipes').doc(id).get()
    
    if (!recipeResult.data) {
      return {
        success: false,
        message: '菜谱不存在'
      }
    }
    
    // 获取分类信息
    let categoryInfo = null
    if (recipeResult.data.category) {
      const categoryResult = await db.collection('categories').doc(recipeResult.data.category).get()
      categoryInfo = categoryResult.data
    }
    
    return {
      success: true,
      data: {
        recipe: recipeResult.data,
        category: categoryInfo
      }
    }
  } catch (error) {
    console.error('获取菜谱详情失败', error)
    return {
      success: false,
      message: '获取菜谱详情失败',
      error: error.message
    }
  }
}
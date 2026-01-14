// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { categoryId, page = 1, pageSize = 10 } = event
    
    let query = db.collection('recipes')
    
    // 如果提供了分类ID，则根据分类ID查询
    if (categoryId) {
      query = query.where({ category: categoryId })
    }
    
    // 计算跳过的记录数
    const skip = (page - 1) * pageSize
    
    // 获取总记录数
    const countResult = await query.count()
    const total = countResult.total
    
    // 获取分页数据
    const recipesResult = await query
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(pageSize)
      .get()
    
    // 获取分类信息（如果提供了分类ID）
    let categoryInfo = null
    if (categoryId) {
      const categoryResult = await db.collection('categories').doc(categoryId).get()
      categoryInfo = categoryResult.data
    }
    
    return {
      success: true,
      data: {
        recipes: recipesResult.data,
        category: categoryInfo,
        pagination: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize)
        }
      }
    }
  } catch (error) {
    console.error('获取分类菜谱失败', error)
    return {
      success: false,
      message: '获取分类菜谱失败',
      error: error.message
    }
  }
}
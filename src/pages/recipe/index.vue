<template>
  <view class="min-h-screen bg-gray-50">
    <!-- 加载状态 -->
    <view v-if="loading" class="flex items-center justify-center h-64">
      <van-loading type="spinner" color="#1989fa" />
    </view>
    
    <!-- 菜谱详情 -->
    <view v-else-if="recipe" class="space-y-4">
      <!-- 菜谱图片 -->
      <view class="h-64 bg-gray-200 flex items-center justify-center">
        <text class="text-gray-500">菜谱图片</text>
      </view>
      
      <!-- 菜谱信息 -->
      <view class="p-4 bg-white">
        <h1 class="text-2xl font-bold mb-2">{{ recipe.title }}</h1>
        
        <!-- 标签 -->
        <view class="flex flex-wrap gap-2 mb-4">
          <view class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
            {{ category.name }}
          </view>
          <view class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
            {{ recipe.difficulty }}
          </view>
          <view class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
            {{ recipe.time }}分钟
          </view>
        </view>
        
        <!-- 评分 -->
        <view class="flex items-center mb-4">
          <view class="flex items-center">
            <uni-icons type="star" size="16" color="#ffb400" class="mr-1" />
            <text class="text-sm font-medium">{{ recipe.rating || 0 }}</text>
          </view>
          <text class="text-sm text-gray-500 ml-4">{{ recipe.views || 0 }}次浏览</text>
        </view>
        
        <!-- 简介 -->
        <text class="text-gray-600">{{ recipe.description }}</text>
      </view>
      
      <!-- 用料 -->
      <view class="p-4 bg-white">
        <h2 class="text-xl font-bold mb-4">用料</h2>
        <view class="space-y-2">
          <view v-for="(ingredient, index) in recipe.ingredients" :key="index" class="flex justify-between items-center">
            <text class="text-gray-800">{{ ingredient.name }}</text>
            <text class="text-gray-500">{{ ingredient.amount }}</text>
          </view>
        </view>
      </view>
      
      <!-- 做法步骤 -->
      <view class="p-4 bg-white">
        <h2 class="text-xl font-bold mb-4">做法步骤</h2>
        <view class="space-y-4">
          <view v-for="(step, index) in recipe.steps" :key="index" class="flex gap-4">
            <view class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {{ index + 1 }}
            </view>
            <view class="flex-1">
              <text class="text-gray-800">{{ step.description }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 错误状态 -->
    <view v-else class="flex flex-col items-center justify-center h-64">
      <uni-icons type="info" size="48" color="#ccc" class="mb-4" />
      <text class="text-gray-500">加载失败，请重试</text>
      <van-button type="primary" class="mt-4" @click="loadRecipeDetail">重试</van-button>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
      <van-button type="default" plain round class="flex-1 mr-2">
        <uni-icons type="heart" size="20" color="#999" class="mr-1" />
        收藏
      </van-button>
      <van-button type="primary" round class="flex-1 ml-2">
        <uni-icons type="chat" size="20" color="#fff" class="mr-1" />
        评论
      </van-button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(true)
const recipe = ref(null)
const category = ref({})

// 加载菜谱详情
const loadRecipeDetail = async () => {
  loading.value = true
  try {
    const id = route.params.id
    const res = await wx.cloud.callFunction({
      name: 'getRecipeDetail',
      data: { id }
    })
    
    if (res.result.success) {
      recipe.value = res.result.data.recipe
      category.value = res.result.data.category
    } else {
      uni.showToast({
        title: res.result.message || '加载失败',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('加载菜谱详情失败', error)
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

// 监听路由变化，重新加载数据
watch(() => route.params.id, () => {
  loadRecipeDetail()
})

// 页面加载时初始化数据
onMounted(() => {
  loadRecipeDetail()
})
</script>

<style scoped>
</style>
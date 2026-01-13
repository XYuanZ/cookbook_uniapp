<template>
  <view class="min-h-screen bg-gray-50">
    <!-- 搜索栏 -->
    <view class="p-4 bg-white shadow-sm">
      <view class="flex items-center bg-gray-100 rounded-full p-2">
        <uni-icons type="search" size="20" color="#999" class="ml-2" />
        <input 
          type="text" 
          placeholder="搜索菜谱" 
          class="flex-1 ml-2 bg-transparent outline-none text-gray-800"
        />
      </view>
    </view>

    <!-- 轮播图 -->
    <view class="p-4">
      <swiper class="rounded-lg overflow-hidden" indicator-dots autoplay>
        <swiper-item>
          <view class="bg-blue-500 h-48 flex items-center justify-center text-white font-bold">
            轮播图1
          </view>
        </swiper-item>
        <swiper-item>
          <view class="bg-green-500 h-48 flex items-center justify-center text-white font-bold">
            轮播图2
          </view>
        </swiper-item>
        <swiper-item>
          <view class="bg-red-500 h-48 flex items-center justify-center text-white font-bold">
            轮播图3
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 分类 -->
    <view class="p-4 bg-white">
      <h2 class="text-xl font-bold mb-4">分类</h2>
      <view class="grid grid-cols-4 gap-4">
        <view v-for="(item, index) in categories" :key="index" class="flex flex-col items-center">
          <view class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <uni-icons type="star" size="24" color="#1989fa" />
          </view>
          <text class="text-sm">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <!-- 推荐菜谱 -->
    <view class="p-4 bg-white mt-4">
      <h2 class="text-xl font-bold mb-4">推荐菜谱</h2>
      <view class="grid grid-cols-2 gap-4">
        <view v-for="(recipe, index) in recipes" :key="index" class="rounded-lg overflow-hidden shadow-sm">
          <view class="bg-gray-200 h-32 flex items-center justify-center">
            <text class="text-gray-500">菜谱图片</text>
          </view>
          <view class="p-2">
            <text class="font-bold text-gray-800">{{ recipe.title }}</text>
            <view class="flex items-center mt-1">
              <uni-icons type="time" size="12" color="#999" />
              <text class="text-xs text-gray-500 ml-1">{{ recipe.time }}分钟</text>
              <uni-icons type="fire" size="12" color="#999" class="ml-3" />
              <text class="text-xs text-gray-500 ml-1">{{ recipe.difficulty }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <van-tabbar active="0" @change="onChange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o">收藏</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  { name: '川菜' },
  { name: '粤菜' },
  { name: '湘菜' },
  { name: '鲁菜' },
  { name: '苏菜' },
  { name: '浙菜' },
  { name: '闽菜' },
  { name: '徽菜' }
])

const recipes = ref([
  { title: '宫保鸡丁', time: 30, difficulty: '简单' },
  { title: '鱼香肉丝', time: 25, difficulty: '简单' },
  { title: '麻婆豆腐', time: 20, difficulty: '简单' },
  { title: '水煮鱼', time: 40, difficulty: '中等' }
])

const onChange = (index) => {
  console.log('切换到标签', index)
}
</script>

<style scoped>
</style>
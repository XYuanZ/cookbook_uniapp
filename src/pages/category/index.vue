<template>
  <view class="min-h-screen bg-gray-50">
    <view class="p-4 bg-white shadow-sm">
      <h1 class="text-2xl font-bold">分类</h1>
    </view>
    
    <view class="p-4">
      <view class="grid grid-cols-3 gap-4">
        <view v-for="(item, index) in categories" :key="index" class="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
          <uni-icons type="star" size="32" color="#1989fa" class="mb-2" />
          <text class="font-medium">{{ item.name }}</text>
        </view>
      </view>
    </view>
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
  { name: '徽菜' },
  { name: '东北菜' }
])
</script>

<style scoped>
</style>
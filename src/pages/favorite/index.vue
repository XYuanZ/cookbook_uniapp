<template>
  <view class="min-h-screen bg-gray-50">
    <view class="p-4 bg-white shadow-sm">
      <h1 class="text-2xl font-bold">我的收藏</h1>
    </view>
    
    <view class="p-4">
      <view v-if="favorites.length === 0" class="flex flex-col items-center justify-center py-12">
        <uni-icons type="heart" size="48" color="#ccc" class="mb-4" />
        <text class="text-gray-500">暂无收藏</text>
        <van-button type="primary" class="mt-4">去逛逛</van-button>
      </view>
      
      <view v-else class="space-y-4">
        <view v-for="(item, index) in favorites" :key="index" class="bg-white rounded-lg shadow-sm overflow-hidden">
          <view class="flex">
            <view class="bg-gray-200 w-24 h-24 flex items-center justify-center">
              <text class="text-gray-500">图片</text>
            </view>
            <view class="flex-1 p-3">
              <text class="font-bold text-gray-800">{{ item.title }}</text>
              <view class="flex items-center mt-1">
                <uni-icons type="star" size="12" color="#ffb400" />
                <text class="text-xs text-gray-500 ml-1">4.5分</text>
              </view>
            </view>
            <view class="p-3">
              <van-button type="danger" size="small" plain @click="onUnfavorite(index)">
                <uni-icons type="heart-filled" size="16" color="#ee0a24" />
              </van-button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const favorites = ref([])

const onUnfavorite = (index) => {
  favorites.value.splice(index, 1)
}
</script>

<style scoped>
</style>
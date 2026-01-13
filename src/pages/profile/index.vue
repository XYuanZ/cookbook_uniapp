<template>
  <view class="min-h-screen bg-gray-50">
    <!-- 用户信息 -->
    <view class="bg-white p-4 shadow-sm">
      <view class="flex items-center">
        <view class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <uni-icons type="person" size="32" color="#999" />
        </view>
        <view class="flex-1">
          <text class="text-lg font-bold">未登录</text>
          <text class="text-sm text-gray-500">点击登录</text>
        </view>
        <uni-icons type="arrowright" size="20" color="#999" />
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="bg-white mt-4 p-4 shadow-sm">
      <view class="space-y-4">
        <view class="flex items-center justify-between" @click="onClick('orders')">
          <view class="flex items-center">
            <uni-icons type="list" size="20" color="#1989fa" class="mr-3" />
            <text>我的订单</text>
          </view>
          <uni-icons type="arrowright" size="16" color="#999" />
        </view>
        
        <view class="border-t border-gray-100 pt-4"></view>
        
        <view class="flex items-center justify-between" @click="onClick('address')">
          <view class="flex items-center">
            <uni-icons type="location" size="20" color="#1989fa" class="mr-3" />
            <text>收货地址</text>
          </view>
          <uni-icons type="arrowright" size="16" color="#999" />
        </view>
        
        <view class="border-t border-gray-100 pt-4"></view>
        
        <view class="flex items-center justify-between" @click="onClick('settings')">
          <view class="flex items-center">
            <uni-icons type="setting" size="20" color="#1989fa" class="mr-3" />
            <text>设置</text>
          </view>
          <uni-icons type="arrowright" size="16" color="#999" />
        </view>
      </view>
    </view>

    <!-- 云开发登录按钮 -->
    <view class="p-4">
      <van-button type="primary" block @click="login">微信登录</van-button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const onClick = (type) => {
  console.log('点击了', type)
}

const login = () => {
  wx.cloud.callFunction({
    name: 'login',
    success: res => {
      console.log('登录成功', res.result)
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
    },
    fail: err => {
      console.error('登录失败', err)
      uni.showToast({
        title: '登录失败',
        icon: 'none'
      })
    }
  })
}
</script>

<style scoped>
</style>
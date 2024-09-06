import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '../../api/user'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore('big-user', () => {
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }

  const user = ref({
    userID: null, // 添加 userID 属性
    username: '',
    nickname: '',
    user_pic: ''
  })

  const getUser = async () => {
    const res = await userGetInfoService() // 请求获取数据
    user.value = {
      userID: res.data.data.id, // 设置 userID
      username: res.data.data.username,
      nickname: res.data.data.nickname,
      user_pic: res.data.data.user_pic
    }
  }

  const setUser = (obj) => {
    user.value = {
      userID: obj.id, // 设置 userID
      username: obj.username,
      nickname: obj.nickname,
      user_pic: obj.user_pic
    }
  }

  return {
    token,
    setToken,
    removeToken,
    user,
    getUser,
    setUser
  }
}, {
  persist: true
})

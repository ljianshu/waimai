import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api'
export default {
  async getAddress ({
    commit,
    state
  }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {
        address
      })
    } else {
      console.log('reqAddress')
    }
  },
  async getCategory ({
    commit
  }) {
    const result = await reqFoodCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORY, {
        categorys
      })
    }
  },
  async getShops ({
    commit,
    state
  }) {
    const {
      longitude,
      latitude
    } = state
    const result = await reqShops(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {
        shops
      })
    }
  },
  // 同步记录用户信息
  getUserInfo ({
    commit
  }, userInfo) {
    commit(RECEIVE_USER_INFO, {
      userInfo
    })
  },
  // 异步获取用户信息
  async getUserInfoAsync ({
    commit
  }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {
        userInfo
      })
    }
  },
  // 请求退出
  async logout ({
    commit
  }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  async getShopGoods ({
    commit
  }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {
        goods
      })
      callback && callback()
    }
  },
  async getShopInfo ({
    commit
  }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {
        info
      })
    }
  },
  async getShopRatings ({
    commit
  }) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {
        ratings
      })
    }
  }
}

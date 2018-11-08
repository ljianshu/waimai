<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left"
             @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo"
                 :class="{highlight: totalCount}">
              <i class="iconfont icon-gouwuche"
                 :class="{highlight: totalCount}"></i>
            </div>
            <div class="num"
                 v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price"
               :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay"
               :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list"
             v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty"
                  @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food"
                  v-for="(food, index) in cartFoods"
                  :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

    </div>
    <div class="list-mask"
         v-show="listShow"
         @click="toggleShow"></div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
</style>

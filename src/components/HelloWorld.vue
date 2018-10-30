<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;"
             :class="{on:loginWay}"
             @click="loginWay=true">短信登录</a>
          <a href="javascript:;"
             :class="{on:!loginWay}"
             @click="loginWay=false"> 密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel"
                     maxlength="11"
                     v-model="phone"
                     placeholder="手机号">
              <button :disabled="!rightPhone"
                      class="get_verification"
                      :class="{right_phone:rightPhone}"
                      @click.prevent="getCode">{{computeTime > 0 ? `已发送(${computeTime}s)` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel"
                     maxlength="8"
                     placeholder="验证码"
                     v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text"
                       maxlength="20"
                       placeholder="手机/邮箱/用户名"
                       v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel"
                       maxlength="8"
                       placeholder="密码"
                       v-if=showPwd
                       v-model="pwd">
                <input type="password"
                       maxlength="8"
                       placeholder="密码"
                       v-else
                       v-model="pwd">
                <div class="switch_button "
                     :class="showPwd ? 'on':'off'"
                     @click="showPwd=!showPwd">
                  <div class="switch_circle"
                       :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd? 'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text"
                       maxlength="11"
                       placeholder="验证码"
                       v-model="captcha">
                <img class="get_verification"
                     src="http://localhost:4000/captcha"
                     @click="getCaptcha"
                     alt="captcha"
                     ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;"
           class="about_us">关于我们</a>
      </div>
      <a href="javascript:"
         class="go_back">
        <i class="iconfont icon-ziyuan"
           @click="$router.go(-1)"></i>
      </a>
    </div>
    <AlertTip v-if="showAlert"
              :alertText="alertText"
              @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
import AlertTip from '@/components/AlertTip/AlertTip'
import { reqSendCode, reqSmsLogin, reqPwdLogin } from '@/api'

export default {
  name: 'login',
  data () {
    return {
      loginWay: true, // 1短信登陆，2密码登陆
      phone: '',
      code: '',
      computeTime: 0,
      showPwd: false,
      name: '',
      pwd: '',
      captcha: '',
      showAlert: false,
      alertText: ''

    }
  },
  computed: {
    rightPhone () {
      const testphone = /^1\d{10}$/.test(this.phone)
      console.log(testphone)
      return testphone
    }

  },
  methods: {

    async getCode () {
      // 定时器
      if (!this.computeTime) {
        this.computeTime = 30
        this.IntervalId = setInterval(() => {
          this.computeTime--
          console.log(this.computeTime)
          if (this.computeTime <= 0) {
            clearInterval(this.IntervalId)
          }
        }, 1000)
        // 发送ajax
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          this.AlertMsg(result.msg)
          if (this.computeTime) {
            this.computeTime = 0
            clearInterval(this.IntervalId)
            this.IntervalId = undefined
          }
        }
      }
    },
    AlertMsg (alertText) {
      this.showAlert = true
      this.alertText = alertText
    },
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },
    async login () {
      let result
      if (this.loginWay) {
        const { rightPhone, phone, code } = this
        if (!rightPhone) {
          // 手机号出错
          return this.AlertMsg('手机号出错')
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码不正确
          return this.AlertMsg('验证码不正确')
        }
        result = await reqSmsLogin(phone, code)
      } else {
        const { name, pwd, captcha } = this
        if (!name) {
          // 用户名必须指定
          return this.AlertMsg('用户名必须指定')
        } else if (!pwd) {
          // 密码必须指定
          return this.AlertMsg('密码必须指定')
        } else if (!captcha) {
          // 图形验证码必须指定
          return this.AlertMsg('图形验证码必须指定')
        }
        result = await reqPwdLogin({ name, pwd, captcha })
      }
      if (result.code === 0) {
        // 存入vuex
        const user = result.data
        this.$store.dispatch('recordUser', user)
        // 跳转页面
        this.$router.push('/profile')
      } else {
        const msg = result.msg
        this.AlertMsg(msg)
        this.getCaptcha()
      }
    },
    getCaptcha () {
      // 图形验证码
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      // event.target.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  },
  components: {
    AlertTip
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          cursor pointer
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color #000
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(30px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 10px
      left 10px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>

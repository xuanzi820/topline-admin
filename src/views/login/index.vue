<template>
    <div class="login-wrap">
        <div class="login-form-wrap">
            <div class="login-head">
                <img src="./logo_index.png" alt="">
            </div>
            <div class="login-form">
                <el-form ref="form" :model="form">
                    <el-form-item>
                        <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <!-- 支持栅格布局，一共是24列 -->
                        <el-col :span="12">
                            <el-input v-model="form.code" placeholder="验证码"></el-input>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-button @click="handleSendCode">发送验证码</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <!-- 给组件加class,会作用到它的根元素 -->
                        <el-button class="btn-login" type="primary" @click="handleLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import '@/vendor/gt'
import axios from 'axios'
export default {
  name: 'AppLogin',
  data() {
    return {
      form: {
        mobile: '15733298674',
        code: ''
      },
      capchaObj: null // 通过 initGeetest 得到的极验验证码对象
    }
  },
  methods: {
    handleLogin() {
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      }).then(res => { // 状态码>=200&&<400的都会进入此处
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      }).catch(err => { // 状态码>=400的都会进入此处
        if (err.response.status === 400) {
          this.$message.error('登陆失败，手机号或验证码错误')
        }
      })
    },
    handleSendCode() {
      const { mobile } = this.form
      if (this.capchaObj) {
        return this.capchaObj.verify()
      }
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        // console.log(res.data)
        const data = res.data.data
        window.initGeetest({
          challenge: data.challenge,
          gt: data.gt,
          new_captcha: data.new_captcha,
          offline: !data.success,
          product: 'bind' // 隐藏按钮式
        }, (captchaObj) => {
          this.capchaObj = captchaObj
          console.log(this)
          captchaObj.onReady(function() {
            captchaObj.verify()
          }).onSuccess(function() {
            // console.log('验证成功了')
            const {
              geetest_challenge: challenge,
              geetest_validate: validate,
              geetest_seccode: seccode } =
            captchaObj.getValidate()
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: { // 专门用来传递query查询字符串参数
                challenge,
                seccode,
                validate
              }
            }).then(res => {
              console.log(res.data)
            })
          })
        }
        )
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-wrap {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    .login-form-wrap {
        background-color: #fff;
        padding: 40px 50px;
        border-radius: 10px;
        .login-head {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            img {
                width: 150px;
            }
        }
       .btn-login {
            width: 100%;
            background-color: yellowgreen;
        }
    }
}
</style>

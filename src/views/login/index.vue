<template>
    <div class="login-wrap">
        <div class="login-form-wrap">
            <div class="login-head">
                <img src="./logo_index.png" alt="">
            </div>
            <div class="login-form">
                <el-form :model="form"  :rules="rules" ref="ruleForm" >
                    <el-form-item prop="mobile">
                        <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <!-- 支持栅格布局，一共是24列 -->
                        <el-col :span="12">
                            <el-input v-model="form.code" placeholder="验证码"></el-input>
                        </el-col>
                        <el-col :span="10" :offset="2">
                          <!-- <el-button @click="handleSendCode">获取验证码</el-button> -->
                          <el-button
                          @click="handleSendCode"
                          :disabled="!!codeTimer"
                          >
                            {{codeTimer ? `剩余${codeSecons}秒` : '获取验证码' }}
                          </el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="agree">
                      <el-checkbox v-model="form.agree" class="el-checkbox"></el-checkbox>
                      <span>我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
                    </el-form-item>
                    <el-form-item>
                        <!-- 给组件加class,会作用到它的根元素 -->
                        <el-button
                        class="btn-login"
                        type="primary"
                        @click="handleLogin"
                        :loading="loginLoading"
                        >登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import '@/vendor/gt'
import axios from 'axios'
const initCodeSeconds = 60
export default {
  name: 'AppLogin',
  data() {
    return {
      form: { // 表单数据
        mobile: '15733298674',
        code: '',
        agree: '' // 是否同意用户协议
      },
      loginLoading: false, // 登录按钮的loading状态
      rules: { // 表单验证规则
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度必须为11位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度必须为6位', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议', trigger: 'change' },
          { pattern: /true/, message: '请同意用户协议', trigger: 'change' }
        ]
      },
      capchaObj: null, // 通过 initGeetest 得到的极验验证码对象
      codeSecons: initCodeSeconds, // 倒计时的时间
      codeTimer: null // 倒计时定时器
    }
  },
  methods: {
    handleLogin() {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          return
        }
        // 表单验证通过，提交登录
        this.submitLogin()
      })
    },
    submitLogin() {
      this.loginLoading = true
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      }).then(res => { // 状态码>=200 && <400的都会进入此处
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
        this.loginLoading = false
      }).catch(err => { // 状态码>=400的都会进入此处
        if (err.response.status === 400) {
          this.$message.error('登陆失败，手机号或验证码错误')
        }
        this.loginLoading = false
      })
    },
    handleSendCode() {
      // 检验手机号是否有效
      this.$refs['ruleForm'].validateField('mobile', errorMessage => {
        // console.log('errorMessage => ', errorMessage)
        if (errorMessage.trim().length > 0) {
          return
        }
        // 手机号码有效，初始化验证码插件
        this.showGeetest()
      })
    },
    showGeetest() {
      const { mobile } = this.form
      if (this.capchaObj) {
        return this.capchaObj.verify()
      }
      // 函数中的 function 定义的函数中的 this 指向 window
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
          captchaObj.onReady(() => {
            captchaObj.verify()
          }).onSuccess(() => {
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
              // console.log(res.data)
              this.codeCountdown()
            })
          })
        }
        )
      })
    },
    /*
    *倒计时
    */
    codeCountdown() {
      this.codeTimer = window.setInterval(() => {
        this.codeSecons--
        if (this.codeSecons <= 0) {
          this.codeSecons = initCodeSeconds // 让倒计时的时间回到初始值
          window.clearInterval(this.codeTimer) // 清除定时器
          this.codeTimer = null
        }
      }, 1000)
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
    .el-checkbox{
      margin-right: 10px;
    }
}
</style>

<template>
    <div>
        <van-nav-bar title="登录" left-text="返回" right-text="注册" left-arrow @click-left="goBack()" @click-right="goRegister()" />
        <div class="register-panel">
            <!-- <van-cell-group> -->
                <van-field v-model="username" label="用户名" clearable :error-message="usernameErrorMsg" placeholder="请输入用户名" required />
                <van-field v-model="password" label="密码" type="password" :error-message="passwordErrorMsg" placeholder="请输入密码" required />
            <!-- </van-cell-group> -->
            
            <div class="register-button">
                <van-button type="primary" @click="loginAction()" :loading="openLoading" size="large">登录</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { Toast } from 'vant'
    import URL from '@/serviceAPI.config.js'
    export default {
        name: 'Register',
        data() {
            return {
                username: '',
                password: '',
                openLoading: false, //是否开户用户注册的Loading状态，用于防止重复提交
                usernameErrorMsg: '', //当用户名出现错误的时候
                passwordErrorMsg: '', //当密码出现错误的时候
            }
        },
        created() {
            // localStorage.clear();
            if(localStorage.userInfo) {
                Toast.success('您已经登录');
                this.$router.push('/');
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            goRegister() {
                this.$router.push('/register');
            },
            checkForm() {
                let isOk = true;
                if(this.username.length < 5) {
                    this.usernameErrorMsg = '用户名不能小于5位';
                    isOk = false;
                } else {
                    this.usernameErrorMsg = '';
                }
                if(this.password.length < 6) {
                    this.passwordErrorMsg = '密码不能小于6位';
                    isOk = false;
                } else {
                    this.passwordErrorMsg = '';
                }
                return isOk;
            },
            loginAction() {
                this.checkForm() && this.axiosLoginUser();
            },
            axiosLoginUser() {
                this.openLoading = true;
                axios({
                    url: URL.getLoginUser,
                    method: 'POST',
                    data: {
                        userName: this.username,
                        password: this.password
                    }
                })
                .then((res)=>{
                    // console.log(res);
                    if(res.data.code === 200 && res.data.message === true) {
                        new Promise((resolve, reject)=>{
                            localStorage.userInfo = {userName: this.username};
                            setTimeout(()=>{ resolve() }, 500);
                        }).then((res)=>{
                            Toast.success('登录成功');
                            this.$router.push('/');
                        }).catch((error)=>{
                            Toast.fail('登录失败');
                            this.openLoading = false;
                        })
                    } else {
                        this.openLoading = false;
                        Toast.fail('登录失败');
                    }
                })
                .catch((error)=>{
                    this.openLoading = false;
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>
    .register-panel {
        margin: 20px auto;
        padding-bottom: 80px;
        width: 96%;
        border-radius: 5px;
    }
    .register-button {
        padding-top: 10px;
    }
</style>
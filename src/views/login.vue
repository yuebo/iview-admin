<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long :loading="loading">登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            loading: false,
            form: {
                userName: 'admin',
                password: '1'
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.$ajax.post('/public/login', {
                        'username': this.form.userName,
                        'password': this.form.password
                    }).then((response) => {
                        // Cookies.set('password', this.form.password);
                        this.$log.log(response)
                        if (response.data.success) {
                            Cookies.set('user', this.form.userName);
                            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                            this.$store.commit('setUserPermissions', response.data.data.permissions);
                            // 保存用户权限到sessionStorage
                            sessionStorage.setItem('permissions', JSON.stringify(response.data.data.permissions));
                            this.$router.push({
                                name: 'home_index'
                            }, () => {
                                this.loading = false;
                            });
                        } else {
                            this.$Message.error(response.data.message);
                            this.loading = false;
                        }
                    }).catch(() => {
                        this.loading = false;
                    });
                }
            });
        }
    }
};
</script>

<style>

</style>

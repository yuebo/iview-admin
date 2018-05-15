<style lang="less">
    @import '../../styles/common.less';
    @import './access.less';
</style>

<template>
    <div class="access">
        <Row>
            <Col span="8">
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                        当前用户
                    </p>
                    <div class="access-user-con access-current-user-con">
                        <img :src="avatorPath" alt="">

                    </div>
                </Card>
            </Col>
            <Col span="16" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="android-contacts"></Icon>
                        不同权限用户的不同菜单
                    </p>
                    <div class="access-user-con access-change-access-con">
                        <Col span="24" class="padding-left-10">
                            <Row type="flex" justify="left" align="top">
                                <p>当前用户权限:</p>
                            </Row>
                            <Row type="flex" justify="center" align="top" class="access-change-access-con-row">

                                <p><b>{{ permissions }}</b></p>
                            </Row>
                        </Col>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'access_index',
    data () {
        return {
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        },
        permissions () {
            return this.$store.state.user;
        }
    },
    methods: {
    }
};
</script>

<style>

</style>

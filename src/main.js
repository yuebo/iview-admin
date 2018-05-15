import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';

Vue.use(VueI18n);
Vue.use(iView);
Vue.prototype.$ajax = util.ajax;
Vue.prototype.$log = console

let root = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
// ajax全局拦截器
Vue.prototype.$ajax.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            var log = console
            log.log(appRouter)
            switch (error.response.status) {
                case 401:
                case 403:
                    root.$router.push({
                        name: 'error-403'
                    });
                    return;
                case 404:
                    root.$router.push({
                        name: 'error-404'
                    });
                    return;
                case 500:
                    root.$router.push({
                        name: 'error-500'
                    });
                    return;
                default:
            }
        }
        return Promise.reject(error.response.data);
    });

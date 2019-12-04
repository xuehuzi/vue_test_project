import Vue from 'vue'
import Router from 'vue-router'
import main_list from '../components/main_list'
import ArticleContent from '../components/ArticleContent'
import UserInfo from '../components/UserInfo'
import sidebar from '../components/sidebar'

Vue.use(Router);

export default new Router({
  routes: [
    {
      //定义根路由
      name: 'root',
      path: '/',
      components: {
        main: main_list
      }
    },
    {
      //定义跳转的路由
      name: 'GoArticleContent',
      path: '/ArticleContent/:id&author=:name',
      components: {
        main: ArticleContent,
        sidebar:sidebar
      }
    },
    {
      name: 'GoUserInfo',
      path: '/UserInfo/:name',
      components: {
        main: UserInfo
      }
    }
  ]
})

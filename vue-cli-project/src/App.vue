<template>
  <div id="app">
    <list></list>
    <img src="./assets/logo.png">
    <router-view/>
    <h3>vue-cli介绍</h3>
    <ul>
      <li>1、是什么：vue-cli是vue.js的脚手架，用于自动生成vue.js+webpack的项目模板</li>
      <li>2、项目目录说明：</li>
      build // 项目构建(webpack)相关代码 记忆：（够贱） 9个<br>
      ├── build.js // 生产环境构建代码<br>
      ├── check­versions.js // 检查node&npm等版本<br>
      ├── dev­client.js // 热加载相关<br>
      ├── dev­server.js // 构建本地服务器<br>
      ├── utils.js // 构建配置公用工具<br>
      ├── vue­loader.conf.js // vue加载器<br>
      ├── webpack.base.conf.js // webpack基础环境配置<br    >
      ├── webpack.dev.conf.js // webpack开发环境配置<br>
      └── webpack.prod.conf.js // webpack生产环境配置<br>
      config// 项目开发环境配置相关代码 记忆： （环配） 3个<br>
      ├── dev.env.js // 开发环境变量（看词明意）<br>
      ├── index.js //项目一些配置变量<br>
      └── prod.env.js // 生产环境变量<br>
      node_modules// 项目依赖的模块 记忆： （依赖） *个<br>
      src// 源码目录 5<br>
      ├── assets// 资源目录<br>
      ├── ├──  logo.png<br>
      ├── components// vue公共组件<br>
      ├── ├──  lHello.vue<br>
      ├── ├──  lHello.vue<br>
      ├── ├──  lHello.vue<br>
      ├── router// 前端路由<br>
      ├── ├──  index.js// 路由配置文件<br>
      ├── ├──  App.vue// 页面入口文件（根组件）<br>
      ├── ├──  main.js// 程序入口文件（入口js文件）
      static// 静态文件，比如一些图片，json数据等<br>
      .babelrc// ES6语法编译配置<br>
      .editorconfig// 定义代码格式<br>
      .gitignore// git上传需要忽略的文件格式<br>
      index.html// 入口页面<br>
      package.json// 项目基本信息<br>
      README.md// 项目说明
    </ul>
    <h3>安装搭建流程</h3>
    <ul>
      <li>1、全局安装vue-cli（npm install -g vue-cli）</li>
      <li>2、初始化项目vue init webpack my-project（my-project即项目名称，建议安装时将router一起安装）</li>
      <pre>
          Project name (cnnode-project)
          Project name cnnode-project
          Project description (A Vue.js project)
          Project description A Vue.js project
          Vue build (Use arrow keys)
          Vue build standalone
          Install vue-router? (Y/n)//是否安装路由
      </pre>
      <li>3、安装依赖，可在第二步初始化项目时就安装vue-router</li>
      <li>4、启动项目 npm run dev</li>
    </ul>
    <h3>路由vue-router基本加载</h3>
    <ul>
      <li>1、安装：（建议在安装vue-cli时，选择将路由一起安装）</li>
      <li>2、引用和注入：vue当前已经实现新建项目目录已经默认进行了vue 和 vue-router 的引用和在实例中注入</li>
      <pre>
        这些已经默认在src>router>index.js默认写好
        import Vue from 'vue'
        import Router from 'vue-router'
        import HelloWorld from '@/components/HelloWorld'
        Vue.use(Router)
        export default new Router({
          routes: [
            {
              path: '/',//配置要跳转的路径
              name: 'HelloWorld',
              component: HelloWorld//指定要跳转的组件
            }
          ]
        })
      </pre>
      <li>3、确定加载位置router-view</li>
    </ul>
    <h3>路由vue-router跳转和参数传递</h3>
    <ul>
      <p>跳转：</p>
      <li>通过router-link标签，to加要跳转的路径（组件名）来进行跳转</li>
      <li>&lt;router-link to="/helloworld"&gt;HelloWorld&lt;/router-link&gt;</li>
      <p>跳转且传递参数：</p>
      <li>传递参数还是通过router-link标签，不过to后面要改为对象写法</li>
      <li>&lt;router-link :to="{name:'HelloWorld',params:{worldmsg:'你好世界！'}}"&gt;HelloWorld&lt;/router-link&gt;</li>
    </ul>
  </div>
</template>

<script>
import list from './components/list'
export default {
  name: 'App',
  components: {
    list
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  li{
    list-style: none;
  }
  p,ul,span,h3,h4{
    text-align: left;
  }
</style>

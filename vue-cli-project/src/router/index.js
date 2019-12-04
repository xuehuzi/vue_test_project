import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import HelloEarth from '../components/HelloEarth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld/:worldmsg',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/HelloEarth/:earthmsg',
      name: 'HelloEarth',
      component: HelloEarth
    }
  ]
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AV from 'leancloud-storage'
import Axios from 'axios'

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
});

AV.init({
  appId: "URfkqxY5iOa3IVFJ8WohECzS-gzGzoHsz",
  appKey: "8G8oDsxnDJ4TTDTA4AapbOLO",
  serverURLs: "https://urfkqxy5.lc-cn-n1-shared.com"
});
/*初始化leancloud*/

let query = new AV.Query('vue_msg');
query.find().then(
  function (todos) {
    let history_msg = todos.map((tgas) => tgas.attributes);
    //console.log(history_msg);
    history_msg.forEach(function (todo) {
      let li = document.createElement('li');
      let div = document.createElement('div');
      let img = document.createElement('img');
      let span = document.createElement('span');
      img.src = `${todo.header_icon}`;
      img.className = 'header_icon';
      div.className = 'img_container'
      span.innerText = `${todo.name}: ${todo.msgvalue}`;
      msg_list.appendChild(li);
      li.appendChild(div);
      li.appendChild(span)
      div.appendChild(img)
      //todo.set('isComplete', true);//这句没搞懂，不屏蔽只取到第一条
    });
    AV.Object.saveAll(todos);//批量更新
  });
/*获取留言列表*/






<template>
  <div class="main_list">
    <div class="loading" v-if="isloading">
      <img src="../assets/loading.gif" alt="">
      <!--数据未返回时显示-->
    </div>
    <div v-else class="content_list">
      <ul>
        <li class="main_list_header">
          <a @click="content_choice(index)" v-for="(content_tab,index) in content_tabs"
             :class="[{content_tab_active:(index === content_tab_num),content_tab_default:(index !== content_tab_num)}]">{{content_tab}}</a>
        </li>
        <li v-for="item in items">
          <router-link :to="{name:'GoUserInfo',params:{name:item.author.loginname}}">
            <img :src="item.author.avatar_url" class="reply_icon">
          </router-link>
          <span class="reply_numb">
            <span>{{item.reply_count}}</span>
            /{{item.visit_count}}
          </span>
          <span
            :class="[{type_good:(item.good === true),type_top:(item.top === true),other_type:(item.good !==true && item.top !== true)}]">
            <span>{{item | item_type}}</span>
          </span>
          <router-link :to="{name:'GoArticleContent',params:{id:item.id,name:item.author.loginname}}">
            <span>
              <a href="">{{item.title}}</a>
          </span>
          </router-link>
          <span class="last_reply">{{item.last_reply_at | time_filter}}</span>
        </li>
        <li>
          <paging @pagingmsg="mainmsg"></paging>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import paging from './paging'

  export default {
    name: "main_list",
    components: {
      paging,
    },
    data: function () {
      return {
        isloading: false,
        items: {},
        pagenumb: 1,
        content_tab_num: 0,
        content_tabs: ['全部', '精华', '分享', '问答', '招聘', '客户端测试']
      }
    },
    methods: {
      getData: function () {
        this.$http.get('https://cnodejs.org/api/v1/topics', {
          params: {
            page: this.pagenumb,
            limit: 20
          }
        })
          .then(
            (res) => {
              this.isloading = false;//加载成功去除加载动画
              this.items = res.data.data
            }
          )
          .catch()
      },
      mainmsg: function (val) {
        this.pagenumb = val;
        this.getData();
      },
      content_choice: function (index) {
        this.content_tab_num = index
      }
    },
    beforeMount() {//熟悉下，生命周期钩子函数
      this.isloading = true;//加载成功之前显示加载动画
      this.getData()
    }
  }
</script>

<style scoped>
  .loading {
    height: 84.5vh;
    background: black;
    opacity: 0.7;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main_list_header > a {
    font-size: 14px;
    margin: 0 10px;
    padding: 3px 4px;
    border-radius: 3px;
    cursor: pointer;
  }

  .content_tab_default {
    color: #80bd01;
  }

  .content_tab_active {
    background-color: #80bd01;
    color: #fff;
  }

  .content_list > ul > li {
    background: #fff;
    border-top: 1px solid #f0f0f0;
    padding: 8px;
    overflow: hidden;
  }

  .reply_numb {
    width: 70px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }

  .last_reply {
    float: right;
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
    color: #778087;
    font-size: 12px;
  }

  .reply_icon {
    width: 30px;
    height: 30px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .type_good, .type_top, .other_type {
    border-radius: 3px;
    padding: 2px 4px;
    font-size: 12px;
    margin-right: 10px;
  }

  .type_good, .type_top {
    color: #fff;
    background: #80bd01;

  }

  .other_type {
    background-color: #e5e5e5;
    color: #999;
  }
</style>

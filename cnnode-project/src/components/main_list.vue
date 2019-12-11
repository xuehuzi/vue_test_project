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
        <li v-if="show_flg === 1" v-for="items4 in items4">
          <router-link :to="{name:'GoUserInfo',params:{name:items4.author.loginname}}">
            <img :src="items4.author.avatar_url" class="reply_icon">
          </router-link>
          <span class="reply_numb">
            <span>{{items4.reply_count}}</span>
              /{{items4.visit_count}}
            </span>
          <span
            :class="[{type_good:(items4.good === true),type_top:(items4.top === true),other_type:(items4.good !==true && items4.top !== true)}]">
          <span>{{items4 | item_type}}</span>
          </span>
          <router-link :to="{name:'GoArticleContent',params:{id:items4.id,name:items4.author.loginname}}">
            <span><a href="">{{items4.title}}</a></span>
          </router-link>
          <span class="last_reply">{{items4.last_reply_at | time_filter}}</span>
        </li>
        <li v-if="show_flg === 2" v-for="items3 in items3">
          <router-link :to="{name:'GoUserInfo',params:{name:items3.author.loginname}}">
            <img :src="items3.author.avatar_url" class="reply_icon">
          </router-link>
          <span class="reply_numb">
            <span>{{items3.reply_count}}</span>
              /{{items3.visit_count}}
            </span>
          <span
            :class="[{type_good:(items3.good === true),type_top:(items3.top === true),other_type:(items3.good !==true && items3.top !== true)}]">
          <span>{{items3 | item_type}}</span>
          </span>
          <router-link :to="{name:'GoArticleContent',params:{id:items3.id,name:items3.author.loginname}}">
            <span><a href="">{{items3.title}}</a></span>
          </router-link>
          <span class="last_reply">{{items3.last_reply_at | time_filter}}</span>
        </li>
        <li v-if="show_flg === 3" v-for="items2 in items2">
          <router-link :to="{name:'GoUserInfo',params:{name:items2.author.loginname}}">
            <img :src="items2.author.avatar_url" class="reply_icon">
          </router-link>
          <span class="reply_numb">
            <span>{{items2.reply_count}}</span>
              /{{items2.visit_count}}
            </span>
          <span
            :class="[{type_good:(items2.good === true),type_top:(items2.top === true),other_type:(items2.good !==true && items2.top !== true)}]">
          <span>{{items2 | item_type}}</span>
          </span>
          <router-link :to="{name:'GoArticleContent',params:{id:items2.id,name:items2.author.loginname}}">
            <span><a href="">{{items2.title}}</a></span>
          </router-link>
          <span class="last_reply">{{items2.last_reply_at | time_filter}}</span>
        </li>
        <li v-if="show_flg === 0" v-for="item in items">
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
        content_tabs: ['全部', '精华', '分享', '问答', '招聘', '客户端测试'],
        //
        items2: [],
        items3: [],
        items4: [],
        items_good: [],
        show_flg: 0,
        limit_numb: 0
        //
      }
    },
    methods: {
      getData: function () {
        this.$http.get('https://cnodejs.org/api/v1/topics', {
          params: {
            page: this.pagenumb,
            limit: 0
          }
        })
          .then(
            (res) => {
              this.isloading = false;//加载成功去除加载动画
              this.items = res.data.data;
              //
              this.items2 = this.items.filter(function (n) {
                if (n.tab === 'ask') {
                  return n
                }
              });
              this.items3 = this.items.filter(function (n) {
                if (n.tab === 'share') {
                  return n
                }
              })
              //
            }
          )
          .catch()
      },
      get_good: function () {
        this.$http.get('https://cnodejs.org/api/v1/topics', {
          params: {
            page: this.pagenumb,
            limit: 1000
          }
        })
          .then(
            (res) => {
              this.items_good = res.data.data;
              this.items4 = this.items_good.filter(function (n) {
                if (n.good === true) {
                  return n
                }
              })
            }
          )
          .catch()
      },
      mainmsg: function (val) {
        this.pagenumb = val;
        if (this.show_flg !== 1) {//当前分类翻页不能影响其他分类翻页
          this.getData();
        } else {
          this.get_good()
        }
      },
      content_choice: function (index) {
        this.content_tab_num = index;
        //
        this.show_flg = index
        //
      }
    },
    beforeMount() {//熟悉下，生命周期钩子函数
      this.isloading = true;//加载成功之前显示加载动画
      this.getData();
      this.get_good();
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

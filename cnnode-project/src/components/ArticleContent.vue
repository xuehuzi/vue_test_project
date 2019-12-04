<template>
  <div class="content_main">
    <div v-if="isloading">
      <img src="../assets/loading.gif">
    </div>
    <div v-else>
      <!--帖子详情-->
      <div class="content_header">
        <div class="content_header_title">{{ArticleContent.title}}</div>
        <ul>
          <li>•发布于:{{ArticleContent.create_at | time_filter}}</li>
          <li>•作者:{{ArticleContent.author.loginname}}</li>
          <li>•浏览次数:{{ArticleContent.visit_count}}</li>
          <li>•来自:{{ArticleContent | item_type}}</li>
        </ul>
      </div>
      <div v-html="ArticleContent.content" class="content_body"></div>
      <!--回复内容-->
      <div class="reply">
        <div class="reply_topbar">{{reply_numb}}回复</div>
        <div class="reply_list" v-for="(reply,index) in ArticleContent.replies">
          <router-link :to="{name:'GoUserInfo',params:{name:reply.author.loginname}}">
            <img :src="reply.author.avatar_url" alt="">
          </router-link>
          <div class="reply_list_info">
            <router-link :to="{name:'GoUserInfo',params: {name:reply.author.loginname}}">
              <span>{{reply.author.loginname}}</span>
            </router-link>
            <span>{{index+1}}楼</span>
            <div class="reply_support">
              <span v-if="reply.ups.length > 0 ">☝{{reply.ups.length}}</span>
              <span v-else></span>
            </div>
          </div>
          <p v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ArticleContent",
    data: function () {
      return {
        isloading: false,
        ArticleContent: {},
        reply_numb: 0
      }
    },
    methods: {
      get_content_data: function () {
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
          .then(
            (res) => {
              if (res.data.success === true) {
                this.isloading = false;
                this.ArticleContent = res.data.data;
              }
            }
          )
          .catch(
            (err) => {
            }
          )
      }
    },
    beforeMount() {
      this.isloading = true;
      this.get_content_data()
    },
    updated() {
      this.reply_numb = document.querySelectorAll('.reply_list').length;
    },
    watch: {
      '$route'(to, from) {
        this.get_content_data()
      }
    }
  }
</script>

<style>
  @import url("../assets/markdown-github.css");

  .markdown-text > p {
    font-size: 15px;
    line-height: 1.7em;
    overflow: auto;
    white-space: pre-wrap;
  }

  .content_main {
    margin-right: 305px;
  }

  .content_body {
    padding: 10px;
    background-color: #fff;
  }

  .content_header {
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
  }

  .content_header > div {
    font-size: 22px;
    font-weight: 700;
  }

  .content_header > ul > li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
  }

  .reply {
    margin-top: 13px;
    background-color: #fff;
  }

  .reply_topbar {
    padding: 10px;
    background-color: #f6f6f6;
    font-weight: bold;
  }

  .reply img {
    width: 30px;
    height: 30px;
  }

  .reply_list {
    border-bottom: 1px solid #e5e5e5;
    padding: 13px 10px;
  }

  .reply_support{
    float: right;
  }

  .reply_list img {
    position: absolute;
  }

  .reply_list_info {
    margin-left: 40px;
  }

  .reply_list p {
    margin-top: 10px;
  }

  .reply_list span {
    font-size: 13px;
    color: #08c;
  }

  .reply_list a {
    text-decoration: none;
  }
</style>

<template>
  <div class="sidebar">
    <div class="panel">
      <div class="user_info_header">作者</div>
      <div class="user_info_body">
        <router-link :to="{name:'GoUserInfo',params:{name:sidebar_userinfo.loginname}}">
          <img :src="sidebar_userinfo.avatar_url" alt="">
        </router-link>
        <p>昵称：{{sidebar_userinfo.loginname}}</p>
        <p>积分：{{sidebar_userinfo.score}}</p>
      </div>
    </div>
    <div class="panel">
      <div class="user_info_header">作者近期主题</div>
      <ul class="user_info_body">
        <li v-for="list in recent_theme">
          <router-link :to="{name:'GoArticleContent',params: {id:list.id,name:list.author.loginname}}">
            {{list.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="panel">
      <div class="user_info_header">作者近期回复</div>
      <ul class="user_info_body">
        <li v-for="list in recent_reply">
          <router-link :to="{name:'GoArticleContent',params: {id:list.id,name:list.author.loginname}}">
            {{list.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sidebar",
    data: function () {
      return {
        sidebar_userinfo: {}
      }
    },
    methods: {
      getData() {
        this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then(res => {
            this.sidebar_userinfo = res.data.data;
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    computed: {
      recent_theme: function () {
        if (this.sidebar_userinfo.recent_topics) {
          return this.sidebar_userinfo.recent_topics.slice(0, 5);
        }
      },
      recent_reply: function () {
        if (this.sidebar_userinfo.recent_replies) {
          return this.sidebar_userinfo.recent_replies.slice(0, 5);
        }
      }
    },
    beforeMount() {
      this.getData()
    }
  }
</script>

<style scoped>
  .sidebar {
    width: 290px;
    font-size: 14px;
    color: #444;
    float: right;
  }

  .panel {
    margin-bottom: 13px;
  }

  .user_info_body > li  {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
  }

  .user_info_body > li > a {
    color: #838383;
    text-decoration: none;
  }

  .user_info_header {
    padding: 11px 10px;
    background-color: #f6f6f6;
  }

  .user_info_body img {
    width: 48px;
    height: 48px;
  }

  .user_info_body {
    background: #fff;
    padding: 11px 10px;
  }

  .user_info_body p {
    margin-top: 10px;
  }

</style>

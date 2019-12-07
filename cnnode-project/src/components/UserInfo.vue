<template>
  <div class="loading" v-if="isloading">
    <img src="../assets/loading.gif">
  </div>
  <div v-else>
    <sidebar></sidebar>
    <div class="ArticleContent_main">
      <section class="panel">
        <router-link :to="{name:'root'}">
          <div class="user_info_header">主页/</div>
        </router-link>
        <div class="user_info_body">
          <img :src="userinfo.avatar_url" alt="">
          <p>昵称：{{userinfo.loginname}}</p>
          <p>积分：{{userinfo.score}}</p>
          <p>注册时间：{{userinfo.create_at | time_filter}}</p>
        </div>
      </section>
      <div class="panel">
        <div class="user_info_header">回复的主题</div>
        <ul class="user_info_body">
          <li v-for="list in userinfo.recent_replies">
            <router-link :to="{name:'GoArticleContent',params:{id:list.id}}">{{list.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="panel">
        <p class="user_info_header">创建的主题</p>
        <ul class="user_info_body">
          <li v-for="list in userinfo.recent_topics">
            <router-link :to="{name:'GoArticleContent',params:{id:list.id}}">{{list.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import sidebar from './sidebar'

  export default {
    name: "GoUserInfo",
    components: {
      sidebar
    },
    data: function () {
      return {
        userinfo: {},
        isloading: false,
      }
    },
    methods: {
      get_userinfo_data: function () {
        this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then(
            (res) => {
              this.isloading = false;
              this.userinfo = res.data.data;
            }
          )
          .catch(
            (err) => {
              console.log(err)
            }
          )
      }
    },
    beforeMount() {
      this.isloading = true;
      this.get_userinfo_data()
    }
  }
</script>

<style scoped>
  .loading {
    height: 84.5vh;
    background: black;
    opacity: 0.7;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ArticleContent_main {
    margin-right: 305px;
  }

  .panel {
    margin-bottom: 13px;
  }

  .user_info_header {
    padding: 11px 10px;
    background-color: #f6f6f6;
  }

  .user_info_body {
    background: #fff;
    padding: 11px 10px;
  }

  .user_info_body > li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
  }

  .user_info_body > li > a {
    color: #838383;
    text-decoration: none;
  }

  .user_info_body img {
    width: 48px;
    height: 48px;
  }

  .user_info_body p {
    margin-top: 10px;
  }
</style>

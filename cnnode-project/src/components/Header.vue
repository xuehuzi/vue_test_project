<template>
  <div class="Header">
    <div>
      <router-link :to="{name:'root'}">
        <img src="../assets/cnodejs_light.svg">
      </router-link>
      <ul class="header_list">
        <router-link :to="{name:'root'}">
          <li>首页</li>
        </router-link>
        <li>新手入门</li>
        <li>API</li>
        <li>关于</li>
        <li>注册</li>
        <li>登陆</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>
  .Header {
    background: #444;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
  }

  .Header>div{
    width: 90%;
    margin: 0 auto;
    padding: 6px;
    max-width: 1400px;
  }

  .header_list {
    float: right;
    text-decoration: none;
    font-size: 14px;
  }

  .header_list li {
    display: inline-block;
    padding: 10px 15px;
    color: #ccc;
  }

  .header_list a li:hover {
    color: #80bd01;
  }

  img {
    width: 120px;
    height: 34px;
  }
</style>

<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="sidebar"></router-view>
      <router-view name="main"></router-view>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
  import Header from './components/Header'
  import main_list from './components/main_list'
  import bottom from './components/bottom'

  export default {
    name: 'App',
    components: {
      Header,
      main_list,
      bottom
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    background: #e1e1e1;
  }

  .main {
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    min-height: 400px;
    margin: 60px auto 10px auto;
  }

  li {
    list-style: none;
  }

  img {
    max-width: 100%;
  }
</style>

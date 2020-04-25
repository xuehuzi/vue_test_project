<template>
  <div id="app">
    <div v-if="isloading" class="loading_animation">
      <div class="loading"></div>
    </div>
    <div v-else class="wrapper">
      <div class="svg_bg">
        <svg id="shape-1" class="shape-1" height="519" width="758" fill="black">
          <polygon class="pol" points="0,455,693,352,173,0,92,0,0,71"></polygon>
        </svg>
        <svg id="shape-2" class="shape-2" height="536" width="633" fill="#c0e3e7">
          <polygon points="0,0,633,0,633,536"></polygon>
        </svg>
      </div>
      <resume_header></resume_header>
      <resume_main></resume_main>
    </div>
  </div>
</template>
<script>
  import resume_header from './components/resume_header'
  import resume_main from './components/resume_main'

  export default {
    name: 'App',
    components: {
      resume_header, resume_main
    },
    data: function () {
      return {
        isloading: true,
      }
    },
    methods:{

    },
    created:function(){
        console.log(this.isloading)
        console.log('加载OK')
        this.isloading = false
        console.log(this.isloading)
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background: #f3f3f3;
  }

  body, h1, h2, h3, h4, h5, h6 {
    font-family: Quicksand, sans-serif;
  }

  a {
    text-decoration: none;
  }

  h2, h4 {
    color: #3d4451;
  }

  li {
    list-style: none;
  }

  .svg_bg {
    position: fixed;
    width: 100%;
  }

  .shape-1 {
    position: absolute;
    left: 0;
    opacity: 0.1;
  }

  .shape-2 {
    position: absolute;
    right: 0;
  }

  .wrapper {
    min-width: 960px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }

  .loading_animation {
    position: fixed;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    overflow: auto;
    z-index: 5;
    background: #fff;
  }

  .loading {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 50%;
  }

  .loading::before,
  .loading::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    animation: loading_animation 2s linear infinite;
    background: black;

  }

  .loading::after {
    animation-delay: 0.75s;
  }

  @keyframes loading_animation {
    from {
      height: 0;
      width: 0;
      opacity: 1;
    }

    to {
      height: 100px;
      width: 100px;
      opacity: 0;
    }
  }


</style>

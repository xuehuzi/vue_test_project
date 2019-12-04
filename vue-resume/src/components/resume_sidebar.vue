<template>
  <div class="sidebar">
    <div class="sidebar_icon">
      <p v-for="(imglist,index) in imglists" @mouseenter="show_introduce($event)" @mouseleave="del_introduce($event)">
        <a :href="imglist.href" target="_blank" download="">
          <img :src="imglist.src" alt="">
        </a>
        <span class="befor">{{imglist.introduce}}</span>
      </p>

    </div>
    <div class="sidebar_horn"></div>
  </div>
</template>

<script>
  export default {
    name: "resume_sidebar",
    data: function () {
      return {
        imglists: [
          {
            src: '../static/download.svg',
            introduce: '下载简历',
            href: '../../static/avatar.png'
          },
          {
            src: '../static/github.svg',
            introduce: 'GitHub',
            href:'https://github.com/xuehuzi?tab=overview&from=2019-12-01&to=2019-12-03'
          },
          {
            src: '../static/code.svg',
            introduce: '3'
          },
          {
            src: '../static/stack.svg',
            introduce: '4'
          },

        ]
      }
    },
    methods: {
      show_introduce: function (e) {
        e.currentTarget.lastChild.classList.add('active')
      },
      del_introduce: function (e) {
        e.currentTarget.lastChild.classList.remove('active')
      },
      exportData: function (index) {
        if (index === 0) {
          window.open("https://vuejs.org/images/logo.png")
          //location.href = "https://vuejs.org/images/logo.png";
        }
        console.log(index)
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    float: right;
    width: 56px;
    background: #fff;
    text-align: center;
    border-top: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    padding-top: 20px;
    position: relative;
    right: 0;
    z-index: 3;
  }

  .sidebar_horn {
    position: relative;
    top: 0
  }

  .sidebar_horn::before {
    content: "";
    position: absolute;
    top: -39px;
    left: -40px;
    border: 40px solid transparent;
    border-left-color: #e1e1e1;
    z-index: -1;
    transform: rotate(225deg);
  }

  .sidebar_horn::after {
    content: "";
    position: absolute;
    top: -41px;
    left: -40px;
    border: 40px solid transparent;
    border-left-color: #fff;
    z-index: -1;
    transform: rotate(225deg);
  }

  .sidebar_icon {
    position: relative;
    left: -9px;
  }

  .sidebar_icon > p > a {
    display: inline-block;
  }

  .sidebar_icon > p > a > img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .sidebar_icon > p > span {
    display: inline-block;
    font-size: 16px;
  }

  .befor {
    position: relative;
    top: -35px;
    left: 70px;
    height: 30px;
    width: 80px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    background: #fff;
    right: -90px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
    line-height: 30px;
    display: inline-block;
    visibility: hidden;
  }

  .befor::before {
    content: '';
    position: absolute;
    right: 80px;
    top: 0;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-right-color: #3d4451;
  }

  .befor::after {
    content: '';
    position: absolute;
    right: 80px;
    top: 0;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-right-color: #fff;
  }

  .active {
    visibility: visible;
  }
</style>

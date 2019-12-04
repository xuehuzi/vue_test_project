<template>
  <div class="resume_header">
    <div class="resume_header_row">
      <div class="header_icon">
        <span href="" class="nav_icon">
          <img src="../../static/logo.svg" alt="">
          <span>name • 应聘Web前端</span>
        </span>
      </div>
      <div class="nav_list">
        <nav>
          <ul>
            <li
              v-for="(list,index) in lists"
              :class="[{nav_active:(sign_index === index)}]"
              @click.prevent="get_section($event)">
              <a :href="list.href">{{list.title}}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>

  import TWEEN from '@tweenjs/tween.js'

  export default {
    name: "resume_header",
    data: function () {
      return {
        lists: [
          {title: '个人信息', href: '#about_information'},
          {title: '作品', href: '#about_work'},
          {title: '技能', href: '#about_skill'},
          {title: '工作经历', href: '#about_history'},
          {title: '留言', href: '#about_message'}
        ],
        sign_index: 0,
      }
    },
    methods: {
      get_section: function (event) {
        let a_href = event.currentTarget.firstChild.getAttribute('href');
        let Jump_target = document.querySelector(a_href);
        let Jump_top = Jump_target.offsetTop;
        let currentTop = window.scrollY;
        let targetTop = Jump_top - 100;
        let s = targetTop - currentTop; // 路程
        let coords = {y: currentTop}; // 起始位置
        let t = Math.abs((s / 100) * 300); // 时间
        if (t > 500) {
          t = 500
        }

        function animate(time) {
          requestAnimationFrame(animate);
          TWEEN.update(time);
        }

        requestAnimationFrame(animate);
        new TWEEN.Tween(coords) // 起始位置
          .to({y: targetTop}, t) // 结束位置 和 时间
          .easing(TWEEN.Easing.Cubic.InOut) // 缓动类型
          .onUpdate(function () {
            // coords.y 已经变了
            window.scrollTo(0, coords.y) // 如何更新界面
          })
          .start(); // 开始缓动
        animate()

      }
    },
    mounted() {
      let that = this;

      function scroll_move() {
        let signs = document.querySelectorAll('[data_x]');//选择所有包含data_x标记的标签
        for (let i = 0; i < signs.length; i++) {
          if (Math.abs(signs[i].offsetTop - window.scrollY) < Math.abs(signs[that.sign_index].offsetTop - window.scrollY)) {
            that.sign_index = i;
          }
        }
        //求出几个目标元素，哪一个距离当前滚动距离最近

        let skill_bar = document.querySelectorAll('.skill_bar');
        for (let i = 0; i < skill_bar.length; i++) {
          if (that.sign_index === 2) {
            skill_bar[i].classList.add('skill_bar11')
          } else {
            skill_bar[i].classList.remove('skill_bar11')
          }
        }
        //技能模块加动画class
      }

      window.onscroll = function () {
        let resume_header = document.querySelector('.resume_header');
        if (window.scrollY > 0) {
          resume_header.classList.add('top_nav_bg');
        } else {
          resume_header.classList.remove('top_nav_bg');
        }
        scroll_move()
      }
      //topnav滚动事件
    }
  }
</script>

<style scoped>
  .resume_header {
    width: 100%;
    position: fixed;
    z-index: 4;
    display: flex;
  }

  .resume_header_row {
    height: 50px;
    margin: 0 auto;
    padding: 10px 0;
  }

  .header_icon {
    margin-right: 470px;
    float: left;
  }

  .nav_list {
    float: right;
  }

  .nav_icon {
    line-height: 50px;
  }

  .nav_icon > img {
    vertical-align: middle;
  }

  .nav_icon > span {
    position: fixed;
    color: #3d4451;
  }

  .nav_list > nav > ul li {
    display: inline-block;
    padding: 10px 15px;
    cursor: pointer;
  }

  .nav_list > nav > ul li a:hover{
    color: #e06567;
  }

  .nav_list > nav > ul li a {
    color: #3d4451;
    text-decoration: none;
    font-weight: bold;
  }

  .nav_active::after {
    content: '';
    display: block;
    background: #e06567;
    height: 3px;
  }

  .top_nav_bg {
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    color: #3d4451;
    padding: 5px 0;
    transition: all 0.3s;
  }

  .nav_list > nav > ul li:last-child {
    padding-right: 0;
  }

</style>

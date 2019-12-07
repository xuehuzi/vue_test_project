<template>
  <div class="popup_mask" @click="close_popup_mask" v-show="son_closemask">
    <div class="popup_list">
      <div
        class="popup_content"
        v-if="son_btnmsg === content_list.name && son_closemask"
        v-for="(content_list,index) in content_lists"
        @click.stop="">
        <div
          class="popupimg_body"
          @mouseover="clear_timer"
          @mouseleave="add_timer">
          <div
            class="popupimg_mask"
            :class="[{open_popubody:(son_btnmsg === content_list.name)}]"
            :style="'width:'+ content_list.imgs.length * 419 +'px;'">
            <img v-for="(imgs,index) in content_list.imgs" :src="imgs.src" alt="">
          </div>
          <ul v-if="content_list.imgs.length >= 2">
            <li class="spots"
                v-for="(spots,index) in content_list.imgs.length-1"
                @click="get_spots($event,index)"
                :class="[{spots_active:(spots_indexflg === index)}]">
            </li>
          </ul>
          <ul v-else>
            <li class="spots"></li>
          </ul>
        </div>
        <div class="popupcontent_body">
          <h4>项目名称：{{content_list.name}}</h4>
          <h4>技术栈：{{content_list.stack}}</h4>
          <h4>项目介绍：</h4>
          <p>{{content_list.description}}</p>
          <div>
            <a :href="content_list.href" target="_blank">预览 & 源码</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TWEEN from '@tweenjs/tween.js'

  export default {
    name: "resume_popup",
    props: ['son_btnmsg', 'son_closemask'],
    data: function () {
      return {
        content_lists: [
          {
            name: 'cavas画板',
            stack: 'js/vue/css/webpack',
            description:
              `项目说明,项目说明,项目说明,项目说明项目说明项目说明项目说明项目说明项目说明项目说明项目说明项目说明
            项目说明,项目说明,项目说明,项目说明项目说明项目说明项目说明项目说明项目说明项目说明项目说明项目说明
            项目说明,项目说明,项目说明,项目说明项目说明项目说明项目说明项目说明项目说明项目说明项目说明项目说明
            项目说明,项目说明,项目说明,项目说明项目说明项目说明项目说明项目说明项目说明项目说明项目说明项目说明`,
            imgs: [
              {src: require('../assets/canvas.jpg')}
            ],
            href: 'https://xuehuzi.github.io/jirengu/Canvas%E7%94%BB%E6%9D%BF.html'
          },
          {
            name: '原生JS(ES6)实现音乐播放器',
            stack: 'js/vue/css/webpack',
            description: '项目说明',
            imgs: [
              {src: require('../assets/music.jpg')},
              {src: require('../assets/music1.jpg')},
              {src: require('../assets/music2.jpg')},
              {src: require('../assets/music.jpg')}

            ],
            href: 'https://xuehuzi.github.io/jirengu/Demo/music-demo/dist/index.html'
          },
          {
            name: 'Vue搭建cnnode社区',
            stack: 'js/vue/css/webpack',
            description: '项目说明',
            imgs: [
              {src: require('../assets/cnnode.jpg')},
              {src: require('../assets/cnnode1.jpg')},
              {src: require('../assets/cnnode2.jpg')},
              {src: require('../assets/cnnode.jpg')}
            ],
            href: 'https://xuehuzi.github.io/vue_test_project/cnnode-project/dist/index.html'
          },
          {
            name: '原生JS(ES5)实现WebQQ界面',
            stack: 'js/vue/css/webpack',
            description: '项目说明',
            imgs: [
              {src: require('../assets/webqq.jpg')},
              {src: require('../assets/webqq1.jpg')},
              {src: require('../assets/webqq2.jpg')},
              {src: require('../assets/webqq3.jpg')},
              {src: require('../assets/webqq.jpg')}
            ],
            href: 'https://xuehuzi.github.io/Self-taught/Native%20javascript/index.html'
          },
          {
            name: '原生JS(ES5)实现转盘抽奖',
            stack: 'js/vue/css/webpack',
            description: '项目说明',
            imgs: [
              {src: require('../assets/choujiang.jpg')},
            ],
            href: 'https://xuehuzi.github.io/Self-taught/Native%20javascript/%E6%8A%BD%E5%A5%96.html'
          },
          {
            name: '原生JS & CSS3实现皮卡丘动画',
            stack: 'js/vue/css/webpack',
            description: '项目说明',
            imgs: [
              {src: require('../assets/pikaqiu.jpg')},
            ],
            href: 'https://xuehuzi.github.io/jirengu/%E7%9A%AE%E5%8D%A1%E4%B8%98demo.html'
          }
        ],
        spots_indexflg: 0,
        timer: null,//封装定时器
        animation: null,//封装动画函数
        add_class: null,//小圆点和left的计数及重置
        testvalue: null
      }
    },
    watch: {
      son_closemask: function (val) {
        this.testvalue = val
      }
    },
    methods: {
      close_popup_mask: function () {
        this.$emit('popup_maskflg', false);//向父组件发送遮罩关闭消息
        this.spots_indexflg = 0
      },
      get_spots: function (e, index) {
        e.currentTarget.parentNode.previousElementSibling.style.left = index * -419 + 'px';
        this.spots_indexflg = index;
      },
      clear_timer: function () {
        clearInterval(this.timer)
      },
      add_timer: function () {
        let that = this;
        let move = document.querySelector('.open_popubody');
        if (move.childNodes.length >= 2) {//2张及以上自动轮播，以下的不轮播
          if (that.timer) {
            clearInterval(that.timer)
          }
          that.timer = setInterval(function () {
            that.add_class(move);
            that.animation(move, that.spots_indexflg);
          }, 1500);
        }
      }
    },
    updated() {
      let that = this;
      if (that.testvalue) {
        let move = document.querySelector('.open_popubody');
        if (move.childNodes.length >= 2) {//2张及以上自动轮播，以下的不轮播
          if (that.timer) {
            clearInterval(that.timer)
          }
          that.timer = setInterval(function () {
            that.add_class(move);
            that.animation(move, that.spots_indexflg);
          }, 1500);
        } else {
          console.log('图太少没轮播')
        }
      } else {
        clearInterval(that.timer);
      }

      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }

      requestAnimationFrame(animate);

      that.animation = function (target, index) {
        let coords = {x: (index - 1) * 419}; // 起始位置
        new TWEEN.Tween(coords)
          .to({x: index * 419}, 500) // 结束位置 和 时间
          .easing(TWEEN.Easing.Cubic.InOut) // 缓动类型
          .onUpdate(function () {
            target.style.left = -Math.floor(coords.x + index) + 'px';
          })
          .start();
        animate()
      };
      that.add_class = function (obj) {
        that.spots_indexflg++;
        if (that.spots_indexflg === obj.childNodes.length - 1) {
          that.spots_indexflg = 0;
          obj.style.left = 0 + 'px';
        }
      }
    }
  }
  /*
  * 》》》弹窗逻辑
  * :son_btnmsg="fathermsg"向子组件传递当前点击是那个项目的按钮
  * :son_closemask="fathermsg1"向子组件传递需要弹出遮罩
  * @popup_maskflg="getson"子组件向父组件通知需要关闭遮罩$emit('popup_maskflg', false)发false给父组件
  * v-if="ttsss"父组件v-if绑定ttsss（动态改变，没弹时父组件赋值true且传给子组件，关闭时子组件赋值false且发给父组件）
  *
  * 》》》轮播逻辑
  * 父组件传来的son_btnmsg确定当前那个项目弹窗是打开的
  * 两个UL标签的v-if确定渲染不同轮播展示效果（content_list.imgs.length，至少需3张图，2张正常轮播1张自动轮播需要的替换图）
  * */
</script>

<style scoped>
  .popup_mask {
    width: 100%;
    height: 100%;
    display: block;
    background: rgba(0, 0, 0, .7);
    z-index: 5;
    position: fixed;
    top: 0;
    left: 0;
  }

  .popup_list {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .popup_content {
    min-width: 866px;
    background: #fff;
    padding: 30px;
    /*display: none;*/
  }

  .popupimg_body {
    overflow: hidden;
    position: relative;
    max-width: 419px;
    min-height: 293px;
    float: left;
  }

  .popupimg_mask {
    /*min-width: 2095px;*/
    position: relative;
    left: 0;
  }

  .popupimg_body > ul {
    display: flex;
    justify-content: center;
  }

  .spots {
    border: 10px solid black;
    width: 1px;
    height: 1px;
    border-radius: 50%;
    float: left;
    margin-right: 10px;
  }

  .spots_active {
    border: 10px solid red;
  }

  .popupcontent_body {
    float: right;
    max-width: 400px;
    position: relative;
  }

  .popupcontent_body > h4 {
    margin-bottom: 15px;
  }

  .popupcontent_body > p {
    line-height: 24px;
    margin-bottom: 10px;
  }

  .popupcontent_body > div {
    text-align: center;
  }

  .popupcontent_body > div > a {
    padding: 8px 30px;
    border-radius: 10px;
    background: #e1e1e1;
    border: 1px solid #cdcfd1;
    color: #3d4451;
  }

</style>

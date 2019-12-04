<template>
  <div class="popup_mask">
    <div class="popup_list">
      <div
        class="popup_content"
        v-for="(content_list,index) in content_lists"
        :class="[{show_popup_content:(son_btnmsg === content_list.name)}]"
        tabindex="0"
        @click="shows"
        @blur="isibles">
        <div class="popupimg_body" @mouseover="clear_timer" @mouseleave="add_timer">
          <div class="popupimg_mask">
            <img v-for="(imgs,index) in content_list.imgs" :src="imgs.src" alt="">
          </div>
          <ul v-if="content_list.imgs.length >= 2">
            <li class="spots"
                v-for="(spots,index) in content_list.imgs.length-1"
                @click="get_spots(index)"
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
          <span>{{content_list.description}}</span>
          <!--<span>{{son_btnmsg}}</span>-->
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
              {src: '../../static/canvas.jpg'},
            ]
          },
          {
            name: '原生JS(ES6)实现音乐播放器',
            stack: 'js/vue/css/webpack',
            description: '项目说明',
            imgs: [
              {src: '../../static/music.jpg'},
              {src: '../../static/music1.jpg'},
              {src: '../../static/music2.jpg'},
              {src: '../../static/music.jpg'},
            ]
          },
          {
            name: 'Vue搭建cnnode社区',
            stack: 'js/vue/css/webpack',
            description: '项目说明',
            imgs: [
              {src: '../../static/cnnode.jpg'},
              {src: '../../static/cnnode1.jpg'},
              {src: '../../static/cnnode2.jpg'},
              {src: '../../static/cnnode.jpg'},
            ]
          },
          {
            name: '原生JS(ES5)实现WebQQ界面',
            stack: 'js/vue/css/webpack',
            description: '项目说明',
            imgs: [
              {src: '../../static/webqq.jpg'},
              {src: '../../static/webqq1.jpg'},
              {src: '../../static/webqq2.jpg'},
              {src: '../../static/webqq3.jpg'},
              {src: '../../static/webqq.jpg'},
            ]
          },
          {
            name: '原生JS(ES5)实现转盘抽奖',
            stack: 'js/vue/css/webpack',
            description: '项目说明',
            imgs: [
              {src: '../../static/choujiang.jpg'},
            ]
          },
          {
            name: '原生JS & CSS3实现皮卡丘动画',
            stack: 'js/vue/css/webpack',
            description: '项目说明',
            imgs: [
              {src: '../../static/pikaqiu.jpg'},
            ]
          }
        ],
        bisible: false,
        testflg: false,
        spots_indexflg: 0,
        timer: null,//封装定时器
        animation: null,//封装动画函数
        open_object: null,//封装确定当前点开的是那个项目弹窗函数
        add_class: null,//小圆点及重置left的函数
        new_object: null
      }
    },
    methods: {
      shows: function () {
        this.bisible = true;
      },
      isibles: function () {
        this.bisible = false;
        this.$emit('popup_maskflg', this.testflg)//向父组件发送遮罩关闭消息
      },
      get_spots: function (index) {
        let move = document.querySelector('.show_popup_content > .popupimg_body >.popupimg_mask');
        move.style.left = index * -419 + 'px';
        this.spots_indexflg = index;
      },
      clear_timer: function () {
        clearInterval(this.timer)
      },
      add_timer: function () {
        let that = this;
        that.new_object = that.open_object(that.content_lists, that.son_btnmsg);
        //console.log(that.new_object);
        if (that.son_btnmsg === that.new_object.name) {
          if (that.new_object.imgs.length >= 2) {
            that.timer = setInterval(function () {
              //debugger
              that.add_class(that.new_object)
            }, 1500);
          } else {
            console.log('图太少没轮播')
          }
        }
      }
    },
    mounted() {
      let that = this;
      let show_popup_content = document.querySelector('.show_popup_content');
      let move = document.querySelector('.show_popup_content > .popupimg_body >.popupimg_mask');
      show_popup_content.focus();//遮罩打开后先获取弹出框焦点，否则直接在弹出框外面点无法关闭弹出框
      move.style.width = move.childNodes.length * 419 + 'px';//动态设置轮播图父级div宽度

      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }

      requestAnimationFrame(animate);

      that.add_class = function (obj) {
        that.spots_indexflg++;
        that.animation(move, that.spots_indexflg);
        if (that.spots_indexflg === obj.imgs.length - 1) {
          that.spots_indexflg = 0;
          move.style.left = 0 + 'px';
        }
      };
      that.open_object = function (type, value) {
        let val;
        type.forEach(function (item) {
          if (value === item.name) {
            val = item
          }
        });
        return val
      };
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

      that.new_object = that.open_object(that.content_lists, that.son_btnmsg);
      if (that.son_btnmsg === that.new_object.name) {//为当前弹窗开始轮播
        if (that.new_object.imgs.length >= 2) {//2张及以上自动轮播，以下的不轮播
          that.timer = setInterval(function () {
            that.add_class(that.new_object)
          }, 1500);
        } else {
          console.log('图太少没轮播')
        }
      }
    }
  }
  /*
  * 》》》弹窗逻辑
  * :son_btnmsg="fathermsg"向子组件传递当前点击是那个项目的按钮
  * :son_closemask="fathermsg1"向子组件传递需要弹出遮罩
  * @popup_maskflg="getson"子组件向父组件通知需要关闭遮罩
  * v-if="ttsss"父组件v-if绑定ttsss（动态改变，没弹时父组件赋值true且传给子组件，关闭时子组件赋值false且发给父组件）
  *
  * 》》》轮播逻辑
  * 父组件传来的son_btnmsg确定当前那个项目弹窗是打开的
  * 两个UL标签的v-if和v-else确定渲染不同轮播展示效果（content_list.imgs.length >= 3，至少需3张图，2张正常轮播1张自动轮播需要的替换图）
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
    display: none;
  }

  .show_popup_content {
    display: block;
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

  .popupcontent_body > span {
    line-height: 24px;
  }

</style>

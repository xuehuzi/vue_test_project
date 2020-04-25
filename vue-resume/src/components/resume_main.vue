<template>
  <div class="resume_main">
    <resume_sidebar></resume_sidebar>
    <div class="main_list">
      <section data_x id="about_information" class="section_list_1 section_list">
        <div class="header_info">
          <h2>{{myname}}</h2>
          <p v-for="info in infos">{{info}}</p>
        </div>
      </section>
      <section data_x id="about_work" class="section_list_4 section_list">
        <h2>作品</h2>
        <div class="content_body" v-for="(work,index) in works" @mouseenter="get_flg($event)"
             @mouseleave="del_flg($event)">
          <img :src="work.src" alt="">
          <div class="mask">
            <div class="explain">
              <h2 class="move">{{work.content}}</h2>
              <button @click="show_btn(index)">项目说明</button>
            </div>
          </div>
        </div>
      </section>
      <section data_x id="about_skill" class="section_list_3 section_list">
        <h2>技能</h2>
        <ol>
          <li v-for="skill in skills">
            <p>{{skill}}</p>
            <div class="skill_bar"></div>
          </li>
        </ol>
      </section>
      <section data_x id="about_history" class="section_list_2 section_list">
        <h2>工作&教育经历</h2>
        <div class="work_time" v-for="(history,index) in historys">
          <div class="time_line">
            <span>
              <strong>{{history.star_time}}</strong>
              <span>-</span>
              <strong>{{history.end_time}}</strong>
            </span>
          </div>
          <div class="work_history" :class="[{work_history_last:(index === historys.length-1)}]">
            <h4>{{history.company_name}}</h4>
            <p>{{history.post_name}}</p>
            <span>{{history.job_content}}</span>
          </div>
        </div>
      </section>
      <section data_x id="about_message" class="section_list_5 section_list">
        <resume_comment></resume_comment>
      </section>
    </div>
    <resume_popup
      :son_btnmsg="fathermsg"
      :son_closemask="fathermsg1"
      @popup_maskflg="getson"
      v-show="ttsss">
    </resume_popup>
  </div>
</template>

<script>
  import Resume_sidebar from "./resume_sidebar";
  import resume_popup from './resume_popup'
  import resume_comment from './resume_comment'

  export default {
    name: "resume_main",
    components: {Resume_sidebar, resume_popup, resume_comment},
    data: function () {
      return {
        myname: '求职意向：Web前端',
        infos: ['姓名：薛玉虎', '性别：男', '城市：西安', '电话：189—9139—8171', '邮箱：xueyuhu5084@163.com'],
        skills: [
          '熟练使用Html5、CSS3完成PC端和移动端布局，实现页面交互及动画效果。',
          '熟悉原生 JavaScript、对 ES6 语法有使用基础，理解 JavaScript 核心概念。',
          '会使用Vue.js，能够使用Vue全家桶构建并开发项目。',
          '会微信小程序开发，有实际个人项目开发经验。',
          '会使用 webpack ,个人简历所列的部分项目就是使用webpack进行打包发布。',
          '知道Http基础知识，能够使用Ajax、Axios到实际项目开发中。\n',
          '能够使用jQuery、Bootstrap，ElementUI等第三方框架&库，可快速上手开发。',
        ],
        active: 0,
        historys: [
          {
            star_time: '2018.09',
            end_time: '2019.04',
            company_name: '陕西互亿通讯科技 ',
            post_name: '电商运营',
            job_content: `负责第三方电商平台和公司小程序平台用户运营工作；设计并制作商品详情页；品牌关键字 SEO。`
          },
          {
            star_time: '2017.05',
            end_time: '2018.07',
            company_name: '陕西大唐智城电子商务有限公司 ',
            post_name: '电商运营',
            job_content: '负责公司旗下电商平台订单数据统计分析；' +
              '通过订单数据对用户分层、分析用户购买行为\n' +
              '下单商品分类等数据进行挖掘，为销售及运营推广活动提供方向支持。 '
          },
          {
            star_time: '2006.09',
            end_time: '2009.06',
            company_name: '陕西全盛科技有限公司',
            post_name: '游戏策划',
            job_content: '编写产品需求文档，设计产品原型图及流程图；开发过程中协调开发进度；' +
              '开发完成后进行功能测试验收等，项目上线后进行各个功能点数据统计分析。\n' +
              '策划任职期间全程参了 4 款手游 1 款页游 1款车贷金融 App，从立项到开发再到上线运营的全部过程。 '
          },
          {
            star_time: '2006.09',
            end_time: '2009.06',
            company_name: '杨凌职业技术学院（专科）',
            post_name: '旅游管理',
            job_content: ''
          }
        ],
        works: [
          {
            src: require('../assets/back-end1.jpg'),
            content: '微信小程序项目后台'
          },
          {
            src: require('../assets/wx1.jpg'),
            content: '微信小程序'
          },
          {
            src: require('../assets/cnnode.jpg'),
            content: 'Vue搭建cnnode社区'
          },
          {
            src: require('../assets/music.jpg'),
            content: '原生JS(ES6)实现音乐播放器'
          },
          {
            src: require('../assets/webqq3.jpg'),
            content: '原生JS(ES5)实现WebQQ界面'
          },
          {
            src: require('../assets/choujiang.jpg'),
            content: '原生JS(ES5)实现转盘抽奖'
          },
          {
            src: require('../assets/pikaqiu.jpg'),
            content: '原生JS & CSS3实现皮卡丘动画'
          },
          {
            src: require('../assets/canvas.jpg'),
            content: 'cavas画板'
          }
        ],
        fathermsg: '',
        fathermsg1: false,
        ttsss: false
      }
    },
    methods: {
      get_flg: function (val) {
        let move = val.currentTarget.querySelector('.explain>h2');
        val.currentTarget.lastChild.classList.add('mask_state');
        move.classList.add('move_flg');
      },
      del_flg: function (val) {
        let move = val.currentTarget.querySelector('.explain>h2');
        val.currentTarget.lastChild.classList.remove('mask_state');
        move.classList.remove('move_flg')
      },
      show_btn: function (val) {
        this.fathermsg = this.works[val].content;//获取点击了那个项目并传递给子组件
        this.fathermsg1 = true;
        this.ttsss = true;//打开弹出框遮罩
      },
      getson: function (val) {
        this.ttsss = val;//接收子组件弹出框遮罩关闭发来的消息
        this.fathermsg1 = false;
      },
    }
  }
</script>

<style scoped>
  .resume_main {
    max-width: 866px;
    margin: 0 auto;
    padding-top: 70px;
  }

  .main_list {
    background: #fff;
    margin-right: 56px;
    padding: 20px;
    border: 1px solid #e1e1e1;
    z-index: 2;
    position: relative;
  }

  .main_list::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    left: 3px;
    top: 3px;
    z-index: -1;
  }

  .main_list::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    left: 6px;
    top: 6px;
    z-index: -1;
  }

  .section_list {
    margin-bottom: 20px;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 30px;
  }

  .section_list_1 {
    background-color: #c0e3e7;
  }

  .header_info {
    padding-top: 30px;
  }

  .header_info p {
    margin: 10px 0;
    color: #3d4451;
    font-size: 17px;
    padding-left: 15px;
  }

  .header_info > ul > li {
    display: inline-block;
    margin: 5px 22px 5px 0;
  }

  .header_info > ul > li > img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .section_list_2 > h2 {
    margin-bottom: 50px;
  }

  .section_list_3 {
    padding-bottom: 20px;
  }

  .section_list_3 > ol {
    padding-left: 50px;
  }

  .section_list_3 > ol > li {
    width: 100%;
    display: inline-block;
    margin: 35px 15px 10px 0;
  }

  .section_list_3 > ol > li > h3 {
    font-size: 14px;
  }

  .section_list_3 > ol > li:nth-child(1) > .skill_bar11::before {
    width: 85%;
  }

  .section_list_3 > ol > li:nth-child(2) > .skill_bar11::before {
    width: 70%;
  }

  .section_list_3 > ol > li:nth-child(3) > .skill_bar11::before {
    width: 60%;
  }

  .section_list_3 > ol > li:nth-child(4) > .skill_bar11::before {
    width: 50%;
  }

  .section_list_3 > ol > li:nth-child(5) > .skill_bar11::before {
    width: 30%;
  }

  .section_list_3 > ol > li:nth-child(6) > .skill_bar11::before {
    width: 30%;
  }

  .section_list_3 > ol > li:nth-child(7) > .skill_bar11::before {
    width: 30%;
  }

  .skill_bar {
    height: 2px;
    background: #FAE1E1;
    border-radius: 2px;
    margin-top: 4px;
    overflow: hidden;
  }

  .skill_bar::before {
    content: "";
    background: #E6686A;
    width: 0;
    height: 100%;
    float: left;
    border-radius: 2px;
    transform: translateX(-100%);
  }

  .skill_bar11::before {
    transform: translateX(0);
    transition: all 1.5s;
  }

  .work_time {
    display: flex;
  }

  .time_line {
    padding-right: 20px;
    margin-right: 10px;
  }

  .time_line > span {
    background: #c0e3e7;
    position: relative;
    padding: 5px 5px;
    top: -8px;
    font-size: 13px;
  }

  .time_line > span::before {
    content: '';
    position: absolute;
    right: -28px;
    top: 0;
    width: 0;
    height: 0;
    border: 14px solid transparent;
    border-left-color: #c0e3e7;
  }

  .work_history {
    border-left: 1px solid #c0e3e7;
    position: relative;
    padding: 0 0 30px 15px;
    max-width: 595px;
  }

  .work_history h4 {
    margin-top: -7px;
    margin-bottom: 14px;
  }

  .work_history p {
    font-weight: bolder;
    margin-bottom: 5px;
    color: #3d4451;
  }

  .work_history span {
    line-height: 2em;
    color: #757575;
  }

  .work_history::before {
    content: '';
    position: absolute;
    left: -4px;
    border: 3px solid black;
    border-radius: 50%;
  }

  .work_history_last {
    padding-bottom: 0;
  }

  /**/
  .section_list_4 h2 {
    margin-bottom: 50px;
  }

  .content_body {
    width: 49%;
    display: inline-block;
    margin-left: 4px;
    position: relative;
  }

  .content_body > img {
    max-width: 100%;
    max-height: 100%;
  }

  .explain h2 {
    position: absolute;
    top: 0;
    color: white;
  }

  .explain button {
    font-family: inherit;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: .05em;
    vertical-align: middle;
    padding: 8px 25px;
    border-radius: 35px;
    border: 0;
    cursor: pointer;
    position: absolute;
    bottom: 40px;
  }

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .1);
    width: 100%;
    height: 98%;
    visibility: hidden;
  }

  .explain {
    display: flex;
    justify-content: center;
  }

  .move_flg {
    transform: translateY(100%);
    transition: all 0.5s;
  }


  .mask_state {
    visibility: visible;
    background: rgba(0, 0, 0, .7);
    transition: all 1s;
  }

</style>

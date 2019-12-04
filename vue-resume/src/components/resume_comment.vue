<template>
  <div class="leave_message">
    <h2>留言</h2>
    <ol id="msg_list"></ol>
    <form class="postmesg" @submit.prevent="postmesg()">
      <label>
        姓名：
        <input type="text" name="name" maxlength="10"/>
      </label>
      <label>
        内容:
        <input @input="getvalue($event)" type="text" name="content"/>
      </label>
      <input type="submit" value="提交"/>
    </form>
  </div>
</template>

<script>
  export default {
    name: "resume_comment",
    data: function () {
      return {
        value: '',
        header_icon:
          [
            require('../assets/header1.svg'),
            require('../assets/header2.svg'),
            require('../assets/header3.svg'),
            require('../assets/header4.svg'),
            require('../assets/header5.svg'),
            require('../assets/header6.svg'),
            require('../assets/header7.svg'),
            require('../assets/header8.svg'),
            require('../assets/header9.svg'),
            require('../assets/header10.svg'),
          ]
      }
    },
    methods: {
      postmesg: function () {
        let AV = require("leancloud-storage");
        let postmesg = document.querySelector('.postmesg');
        let namevalue = postmesg.querySelector("input[name = name]").value; //获取输入信息
        let msgvalue = postmesg.querySelector("input[name = content]").value; //获取输入信息
        let vue_Msg = AV.Object.extend("vue_msg"); //创建表
        let vue_msg = new vue_Msg(); //在表中创建数据
        if (namevalue && msgvalue !== "") {
          vue_msg
            .save({
              name: namevalue,
              msgvalue: msgvalue,
              header_icon: this.header_icon[Math.floor(Math.random() * 10 + 1)]
            })
            .then(function (obj) {
              let li = document.createElement("li");
              let img = document.createElement('img');
              let span = document.createElement('span');
              let div = document.createElement('div');
              span.innerText = `${obj.attributes.name}: ${obj.attributes.msgvalue}`;
              img.src = `${obj.attributes.header_icon}`;

              img.className = 'header_icon';
              div.className = 'img_container';
              msg_list.appendChild(li);
              li.appendChild(div);
              li.appendChild(span);
              div.appendChild(img);
              postmesg.querySelector("input[name = content]").value = "";
              postmesg.querySelector("input[name = name]").value = "";
            });
        } else {
          alert("请输入内容");
        }
      },
      getvalue: function (val) {
        //console.log(val.currentTarget.value)
        if (val.currentTarget.value.length > 65) {
          alert('字数太多啦')
        }
      }
    }
  }
</script>

<style>
  .header_icon {
    height: 35px;
    width: 35px;
  }

  .img_container{
    height: 35px;
    width: 35px;
    margin-right: 15px;
  }

  #msg_list li {
    padding: 15px;
    border-bottom: 1px solid #DDD;
    display: flex;
    align-items: center;
  }

  #msg_list li:last-child {
    margin-bottom: 35px;
  }

  .leave_message form {
    text-align: center;
  }
</style>

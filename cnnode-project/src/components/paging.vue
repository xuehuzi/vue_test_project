<template>
  <div class="paging">
    <button @click="page_home" class="default_class">首页</button>
    <button @click="page_up" class="default_class">上一页</button>
    <button v-if="(selent_page > 4)" class="default_class">......</button>
    <button @click="changebtn(btnlist)" v-for="btnlist in btn_lists"
            :class="[{selent_class_page:btnlist === selent_page},'default_class']">{{btnlist}}
    </button>
    <button @click="page_down" class="default_class">下一页</button>
  </div>
</template>

<script>
  export default {
    name: "paging",
    props: ['reset_paging', 'pagingmsg'],
    data: function () {
      return {
        btn_lists: [1, 2, 3, 4, 5, '......'],
        selent_page: 1,
      }
    },
    methods: {
      changebtn: function (page_numb) {
        if (typeof page_numb === 'number') {
          this.selent_page = page_numb;
          if (page_numb === this.btn_lists[4]) {
            //移除第一个数字
            this.btn_lists.shift();
            //添加最后一个数字
            this.btn_lists.splice(4, 0, this.btn_lists[3] + 1);
          } else if (page_numb === this.btn_lists[0] && page_numb !== 1) {
            //先在第一个位置加一个
            this.btn_lists.unshift(this.btn_lists[0] - 1);
            //移除最后一个数字
            this.btn_lists.splice(5, 1);
          } else if (page_numb === 1) {
            this.btn_lists = [1, 2, 3, 4, 5, '......'];
            this.selent_page = 1
          }
          this.$emit('pagingmsg', this.selent_page)
        }
      },
      page_home: function () {
        this.btn_lists = [1, 2, 3, 4, 5, '......'];
        this.changebtn(1);
      },
      page_up: function () {
        if (this.selent_page - 1 > 1) {
          this.changebtn(this.selent_page - 1);
        } else {
          this.changebtn(1);
        }
      },
      page_down: function () {
        this.changebtn(this.selent_page + 1);
      }
    },
    watch: {
      reset_paging: function (val) {//监听父组件是否重置分页到第一页
        if (val === true) {
          this.selent_page = 1
          this.changebtn(1)
        }
      }
    }
  }
</script>

<style scoped>
  .paging {
    margin-top: 5px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    border: 1px solid #888888;
    text-align: center;
  }

  .default_class {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .selent_class_page {
    color: white;
    background-color: #1f1b1b;
  }

</style>

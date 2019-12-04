<template>
  <div>
    <p>
      <span>我是子组件下面的信息是我爸爸传给我的：</span>
      <span>{{sonmsg}}</span>
    </p>
    <button @click="sedtofather">点我给爸爸传消息</button>
    <p>爷爷告诉我他今年:
      <span>（</span>
      <span>{{getgrandpamsg}}</span>
      <span>）</span>
    </p>
    <button @click="add">我给爷爷加年龄</button>
  </div>
</template>
<script>
  export default {
    name: "son",
    data: function () {
      return {
        msg: '爸爸好这是儿子给你的'
      }
    },
    props: {
      sonmsg: {
        type: String,
        default: ''
      }
    },
    methods: {
      sedtofather: function () {
        this.$emit('getsonmsg', this.msg)
      },
      add:function () {
        this.$store.commit('addnumb')
      }
    },
    computed: {
      getgrandpamsg: function () {
        return this.$store.state.numb;
      }
    }
  }
</script>

<style scoped>

</style>

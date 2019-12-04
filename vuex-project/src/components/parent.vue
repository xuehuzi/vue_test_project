<template>
  <div>
    <p>下面的消息是儿子发给我的：
      <span>{{fromsonmsg}}</span>
    </p>
    <div>爸爸告诉我他今年：
      <span>（</span>
      <span>{{getfathermsg}}</span>
      <span>）</span>
      <span>（</span>
      <span>{{getsfathermsg}}</span>
      <span>）</span>
      <p>
        <button @click="less">我给爸爸减年龄</button>
        <button @click="less2">我给爸爸减年龄2</button>
        <button @click="less3">我给爸爸减年龄3</button>
      </p>
      <hr>
      <son :sonmsg="fathermsg" @getsonmsg="getsonmsgfn"></son>
    </div>
  </div>
</template>

<script>
  import son from './son'

  export default {
    name: "parent",
    data: function () {
      return {
        fathermsg: '“儿子好”',
        fromsonmsg: ''
      }
    },
    components: {
      son
    },
    methods: {
      getsonmsgfn: function (val) {
        this.fromsonmsg = val
      },
      less:function () {
        this.$store.commit('lessnumb')
      },
      less2:function () {
        this.$store.dispatch('fn1')
      },
      less3:function () {
        this.$store.dispatch('fn1')
      }
    },
    computed: {
      getfathermsg: function () {
        return this.$store.state.numb
      },
      getsfathermsg:function () {
        return this.$store.getters.getfn
      }
    }
  }
</script>

<style scoped>

</style>

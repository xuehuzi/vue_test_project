<template>
  <div>
    <p>爷爷在这里，儿子好孙子好</p>
    <p>爷爷今年高寿：
      <span>{{getnumb}}</span>
    </p>
  </div>
</template>

<script>
  export default {
    name: "grandpa",
    computed: {
      getnumb: function () {
        return this.$store.state.numb
      }
    }
  }
</script>

<style scoped>

</style>

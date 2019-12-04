<template>
  <div class="hello">
    <h1>HelloWorld</h1>
    以下是路由传递过来的参数：====<h2>{{$route.params.worldmsg}}</h2>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

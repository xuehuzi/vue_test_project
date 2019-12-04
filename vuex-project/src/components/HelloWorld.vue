<template>
  <div class="hello">
    <fieldset>
      <legend>爷爷在这里</legend>
      <grandpa></grandpa>
    </fieldset>
    <fieldset>
      <legend>爸爸在这里</legend>
      <parent></parent>
    </fieldset>
  </div>
</template>

<script>
  import parent from './parent'
  import grandpa from './grandpa'
  //import son from './son'

  export default {
    name: 'HelloWorld',
    data() {
      return {}
    },
    components: {
      grandpa,
      parent,
    }
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

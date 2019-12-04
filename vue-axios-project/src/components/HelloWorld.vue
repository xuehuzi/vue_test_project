<template>
  <div class="hello">
    <h3>im axios</h3>
    <button @click="getData">发送请求</button>
    <ul>
      <li v-for="item in items">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
Vue.prototype.$http = axios;
import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      items: []
    }
  },
  methods: {
    getData () {
      this.$http.get('https://cnodejs.org/api/v1/topics', {
        params: {
          page: 10,
          limit: 5
        }
      })
        .then(
          (res) => {
            this.items = res.data.data
          }
        )
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

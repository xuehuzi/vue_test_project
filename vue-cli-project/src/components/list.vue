<template>
    <ul>
      <li>
      <router-link :to="{name:'HelloWorld',params:{worldmsg:'你好世界！'}}">HelloWorld</router-link>
      </li>
      <li>
        <router-link :to="{name:'HelloEarth',params:{earthmsg:'你好地球！'}}">HelloEarth</router-link>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'list'
}
</script>

<style scoped>

</style>

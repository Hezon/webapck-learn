<template>
  <div class="div">{{ test }}</div>
</template>

<script>
export default {
  data() {
    return {
      test: 'Hello'
    }
  },
  created() {
    console.log(this.$style.class)
  }
}
</script>

<style module>
.div {
  background: red;
}
</style>

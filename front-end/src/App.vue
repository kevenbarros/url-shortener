<script>
import { RouterLink, RouterView } from 'vue-router'
import api from './services/api'
export default {
  async created() {
    if (this.$store.state.token) {
      const response = await api.post("/checkerToken", {
        headers: {
          token: this.$store.state.token
        }
      })
      if (response.status === 200) {
        await this.$store.commit('logged', true)
      }
    }
  }
}
</script>

<template>

  <router-view></router-view>

</template>

<style scoped>

</style>

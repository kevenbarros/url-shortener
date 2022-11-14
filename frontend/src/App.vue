<script lang="ts">
import { RouterView } from "vue-router";
import { checkerToken } from "./services/serviceUser";

export default {
  async created() {
    if (this.$store.state.token) {
      const response = await checkerToken({
        token: this.$store.state.token,
      });
      if (Number(response.status) === 200) {
        await this.$store.commit("logged", true);
      }
    }
  },
};
</script>

<template>
  <RouterView />
</template>

<style></style>

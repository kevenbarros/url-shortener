<template>
  <button class="button" :disabled="loader" :id="id">
    <div v-if="!loader">{{ $t(title) }}</div>
    <div class="lds-dual-ring" v-else></div>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "button-component",
  props: {
    title: {
      type: String,
      required: true,
    },
    loader: {
      type: Boolean,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
  },
});
</script>
<style scoped>
.button {
  padding: 16px 50px;
  border-radius: 10px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #1976d2;
}

.button:hover {
  background-color: #00984f;
}

.lds-dual-ring {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 20px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 34px;
  height: 34px;

  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

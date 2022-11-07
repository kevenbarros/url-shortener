
<template>
  <button class="button" @click.prevent="$emit('click')" :disabled="loader">
    <div v-if="!loader">{{ title }}</div>
    <div class="lds-dual-ring" v-else></div>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    title: {
      type: String,
      required: true,
    },
    loader: {
      type: Boolean,
      required: false,
    }
  }
}
</script>
<style>
.button {
  padding: 16px 50px;
  border-radius: 10px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #1976D2;
}

.button:hover {
  background-color: #00984F;
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

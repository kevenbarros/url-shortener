<template>
  <button class="button" :disabled="loader" :id="id">
    <div v-if="!loader">{{ $t(title) }}</div>
    <div class="lds-dual-ring" v-else></div>
  </button>
</template>
<script lang="ts" src="./index"></script>
<style scoped lang="scss" src="./index.scss"></style>

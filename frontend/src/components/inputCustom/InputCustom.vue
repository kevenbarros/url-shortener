<template>
  <div class="containerInput">
    <input
      :type="typeInput"
      :id="id"
      class="inputForm"
      :placeholder="placeholder"
      @input="emitValue"
      @keydown="onKeyDown($event)"
    />
    <div class="eye" v-if="type === 'password'" @click="typeChange()">
      <eyeVue v-if="typeInput === 'password'" />
      <closedEye v-else />
    </div>
  </div>
</template>
<script lang="ts" src="./index"></script>
<style lang="css" scoped src="./index.scss"></style>

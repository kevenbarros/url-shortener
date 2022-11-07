
<template>
  <input :type="type" class="inputForm" :placeholder="placeholder" @input="emitValue" @keydown="onKeyDown($event)" />
</template>
<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
  },
  methods: {
    clearInput() {
      this.$refs.genericInput.value = ''
      this.$emit('clearField')
    },
    onKeyDown(event) {
      this.$emit('onKeyDown', event)
    },
    emitValue(event) {
      this.$emit('insertedValue', event.target.value)
    }
  }
}
</script>
<style>
.inputForm {
  width: 100%;
  padding: 16px 20px;
  margin-bottom: 32px;
  border-radius: 10px;
  border: 1px solid #BDBDBD;
}
</style>

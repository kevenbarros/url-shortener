
<template>
  <div class="containerInput">
    <input :type="typeInput" class="inputForm" :placeholder="placeholder" @input="emitValue" @keydown="onKeyDown($event)" />
    <div class="eye" v-if="type == 'password'" @click="typeChange()">
      <eyeVue v-if="typeInput == 'password'" />
      <closedEye v-else />
    </div>
  </div>
</template>
<script>
import eyeVue from '../../svg/eye.vue'
import closedEye from '../../svg/closedEye.vue'
export default {
  name: 'Input',
  components: {
    eyeVue, closedEye
  },
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
  data() {
    return {
      typeInput: this.type
    }
  },
  methods: {
    typeChange() {
      this.typeInput = this.typeInput == "password" ? "text" : "password"
    },
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
<style >
.containerInput {
  position: relative;
}

.eye {
  position: absolute;
  top: 13px;
  right: 2%;
  cursor: pointer;
}

.inputForm {
  width: 100%;
  padding: 16px 20px;
  margin-bottom: 32px;
  border-radius: 10px;
  border: 1px solid #BDBDBD;
}
</style>

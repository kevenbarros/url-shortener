
<template>
  <div class="containerInput">
    <input :type="typeInput" class="inputForm" :placeholder="placeholder" @input="emitValue" @keydown="onKeyDown($event)" />
    <div class="eye" v-if="type == 'password'" @click="typeChange()">
      <eyeVue v-if="typeInput == 'password'" />
      <closedEye v-else />
    </div>
  </div>
</template>
<script lang="ts">
import eyeVue from '../../svg/eye.vue'
import closedEye from '../../svg/closedEye.vue'
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Input',
  components: {
    eyeVue, closedEye
  },
  emits: ["insertedValue", "onKeyDown"],
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
    typeChange(): void {
      this.typeInput = this.typeInput == "password" ? "text" : "password"
    },
    onKeyDown(event: Event): void {
      this.$emit('onKeyDown', event)
    },
    emitValue(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit('insertedValue', target.value)
    }
  }
})
</script>
<style lang="css" scoped>
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

import eyeVue from "../svg/eyeOpen.vue";
import closedEye from "../svg/closedEye.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "input-component",
  components: {
    eyeVue,
    closedEye,
  },
  emits: ["insertedValue", "onKeyDown"],
  props: {
    type: {
      type: String,
      required: false,
      default: "text",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      typeInput: this.type,
    };
  },
  methods: {
    typeChange(): void {
      this.typeInput = this.typeInput === "password" ? "text" : "password";
    },
    onKeyDown(event: Event): void {
      this.$emit("onKeyDown", event);
    },
    emitValue(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit("insertedValue", target.value);
    },
  },
});

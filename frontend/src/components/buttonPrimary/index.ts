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

import ButtonPrimary from "../buttonPrimary/ButtonPrimary.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "modal-components",
  components: {
    ButtonPrimary,
  },
  emits: ["close", "delete"],
  props: {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeOutside(e: any) {
      if (e.target.nodeType === 1 && e.target.classList.contains("taggd")) {
        e.stopPropagation();
        this.close();
      }
    },
    emitDelete() {
      this.$emit("delete");
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
    copyLink(link: string): void {
      this.$toast("Link copiado com sucesso", { type: "success" });
      navigator.clipboard.writeText(link);
    },
  },
});

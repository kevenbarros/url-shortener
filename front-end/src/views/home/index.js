import ButtonPrimaryVue from '../../components/buttonPrimary/ButtonPrimary.vue'
import InputCustom from '../../components/inputCustom/InputCustom.vue'
import api from '../../services/api'
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ButtonPrimaryVue, InputCustom,
  },
  data: () => {
    return {
      url: "",
      shortUrl: "",
      urls: [],
      email: '',
      password: '',
      loader: false,
      error: { err: false, text: "" },
    };
  },
  methods: {
    async getUrls() {
      const response = await api.get("/urlGetAll")
      if (response.status === 200) {
        this.urls = response.data
      }
    },
    async submitUrl() {
      if (this.url.trim() == "") return
      this.loader = true
      const response = await api.post('/url', {
        url: this.url, userId: this.$store.state.userId
      });
      this.loader = false
      if (response.status === 200) {
        this.$toast.success("Url encurtado com sucesso");
        this.getUrls()
        return this.shortUrl = response.data.shortUrl;
      }
      this.$toast.error("Algo inesperado ocorreu");
    },
    copyLink(link) {
      navigator.clipboard.writeText(link);
      this.$toast.success("Copiado com sucesso");
    }
  },
  mounted() {
    this.getUrls()
  }
})

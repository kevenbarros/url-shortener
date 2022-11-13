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
      id: "",
      urls: [],
      email: '',
      password: '',
      loader: false,
      error: { err: false, text: "" },
    };
  },
  methods: {
    async deleteUrl(url) {
      const response = await api.post("/deleteUrl",
        { userId: this.$store.state.userId, id: url, token: this.$store.state.token }
      )
      if (response.status === 200) {
        console.log(response.data.data)
        this.urls = response.data.data
        return this.$toast.success("Url encurtado com sucesso");
      }
      this.$toast.error("Algo inesperado ocorreu");
    },
    async getUrls() {
      const response = await api.post("/urlUser",
        { userId: this.$store.state.userId, token: this.$store.state.token }
      )
      if (response.status === 200) {
        return this.urls = response.data
      }
      this.$toast.error("Algo inesperado ocorreu");
    },
    async submitUrl() {
      if (this.url.trim() == "") return
      this.loader = true
      const response = await api.post("/url", {
        url: this.url, userId: this.$store.state.userId
      });
      this.loader = false
      this.getUrls()
      this.shortUrl = response.data.shortUrl;
    },
  },
  mounted() {
    this.getUrls()
  }
})


import api from '../../services/api'
import ButtonPrimaryVue from '../../components/buttonPrimary/ButtonPrimary.vue'
import InputCustom from '../../components/inputCustom/InputCustom.vue'
import login from '../../services/serviceUser'
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Informations',
  components: {
    ButtonPrimaryVue, InputCustom
  },
  data() {
    return {
      urls: [],
      email: '',
      password: '',
      loader: false,
      error: { err: false, text: "" },
    }
  },
  methods: {
    resetError() {
      this.error = { err: false, text: "" }
    },
    async login() {
      const respo = await login.login({
        email: this.email,
        password: this.password.trim()
      })
      return console.log(respo)
      if (!this.email || !this.password) return
      this.loader = true
      const response = await api.post("/session", {
        email: this.email,
        password: this.password.trim()
      })
      this.loader = false
      if (response.status === 201) {
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('userId', response.data.person._id)
        sessionStorage.setItem('userEmail', response.data.person.email)
        this.$router.push('/list')
      }
      return this.error = { err: true, text: "Não foi possivel fazer login, contate o suporte" }
    }
  },
})


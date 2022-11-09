import api from '../../services/api'
import ButtonPrimaryVue from '../../components/buttonPrimary/ButtonPrimary.vue'
import InputCustom from '../../components/inputCustom/InputCustom.vue'
export default {
  name: 'Informations',
  components: {
    ButtonPrimaryVue, InputCustom
  },
  data() {
    return {
      urls: [],
      email: '',
      password: '',
      confirmPassword: '',
      sucess: false,
      loader: false,
      error: { err: false, text: "" },
    }
  },
  methods: {
    validateEmail(email) {
      const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
      return regex.test(email)
    },
    resetError() {
      this.error = { err: false, text: "" }
    },
    async register() {
      if (!(this.password.trim() === this.confirmPassword.trim())) {
        return this.error = { err: true, text: "senhas não são iguais" }
      }
      if (!this.validateEmail(this.email.trim())) return this.error = { err: true, text: "Email Invalido!" }
      this.loader = true
      const response = await api.post("/user", {
        email: this.email,
        password: this.password.trim()
      })
      console.log(response)
      this.loader = false
      if (response.status === 201) {
        return this.sucess = true
      }
      return this.error = { err: true, text: "Não foi possivel criar sua conta, contate o suporte" }
    },
  },
}

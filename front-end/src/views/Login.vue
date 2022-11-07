<script >
import api from '../services/api'
import ButtonPrimaryVue from '../components/buttonPrimary/ButtonPrimary.vue'
import InputCustom from '../components/inputCustom/InputCustom.vue'
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
      loader: false,
      error: { err: false, text: "" },
    }
  },
  methods: {
    resetError() {
      this.error = { err: false, text: "" }
    },
    async getUrls() {
      this.loader = true
      const response = await api.post("/session", {
        email: this.email,
        password: this.password.trim()
      })
      this.loader = false
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.person._id)
        this.$router.push('/list')
      }
      return this.error = { err: true, text: "Não foi possivel fazer login, contate o suporte" }
    }
  },
}
</script>
<template>
  <div class="container">
    <div>
      <router-link to="/register">
        <button class="btnLogin">
          Fazer Cadastro
        </button>
      </router-link>
    </div>
    <div class="form">
      <div>
        <h2 class="titleMain">Fazer Login</h2>
        <div class="fieldsForm">
          <label for="email" class="labelForm">Email</label>
          <InputCustom placeholder="Digite seu email" type="email" @insertedValue="($event) => { email = $event }" />
          <label for="password" class="labelForm">Senha</label>
          <InputCustom placeholder="Crie sua senha de acesso" type="password" @onKeyDown="resetError()" @insertedValue="($event) => { password = $event }" />
        </div>
      </div>
      <p v-show="error.err" class="error">{{ error.text }}</p>
      <ButtonPrimaryVue title="Entrar" bgColor="#1976D2" :loader="loader" @click="getUrls()" />
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

}

.form {
  width: 60%;
  padding: 30px 50px;
  background-color: aqua;
  align-self: center;
  border-radius: 20px;
  background-color: #EFEFEF;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.creating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fieldsForm {
  display: flex;
  flex-direction: column;
}

.titleMain {
  font-size: 32px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 20px;
}

.labelForm {
  font-size: 14px;
  color: #000000;
  font-weight: 600;
  margin-bottom: 10px;
}

.inputForm {
  padding: 16px 20px;
  margin-bottom: 32px;
  border-radius: 10px;
  border: 1px solid #BDBDBD;
}

.btnLogin {
  color: '#5B5959';
  font-size: 16px;
  padding: 12px 30px;
  background-color: #FFFFFF;
  border-radius: 50px;
  border: 1px solid #5B5959;
  cursor: pointer;
}

.Congratulations {
  font-size: 24px;
  font-weight: 600;
  color: #5B5959;
  margin-bottom: 13px;
}

.infos {
  font-weight: 400;
  font-size: 14px;
  color: #5B5959;
  margin-bottom: 30px;
}

.error {
  color: #F55653;
  margin-bottom: 20px;
}

@media only screen and (max-width: 600px) {
  .form {
    width: 100%;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
  }

  .container {
    padding: 30px 20px;
  }
}
</style>

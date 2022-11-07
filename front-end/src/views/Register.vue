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
      confirmPassword: '',
      sucess: false,
      loader: false,
      error: { err: false, text: "" },
    }
  },
  methods: {
    resetError() {
      this.error = { err: false, text: "" }
    },
    async getUrls() {
      if (!(this.password.trim() === this.confirmPassword.trim())) {
        return this.error = { err: true, text: "senhas não são iguais" }
      }
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
</script>
<template>
  <div class="container">
    <div>
      <router-link to="/login">
        <button class="btnLogin">login</button>
      </router-link>
    </div>
    <div class="form" v-if="!sucess">
      <div>
        <h2 class="titleMain">Fazer Cadastro</h2>
        <div class="fieldsForm">

          <label for="email" class="labelForm">Email</label>

          <InputCustom placeholder="Digite seu email" type="email" @insertedValue="($event) => { email = $event }" />

          <label for="password" class="labelForm">Senha</label>

          <InputCustom placeholder="Crie sua senha de acesso" type="password" @onKeyDown="resetError()" @insertedValue="($event) => { password = $event }" />

          <label for="confirmPassword" class="labelForm">Repita Senha</label>

          <InputCustom placeholder="Repita a senha anterior" type="password" @onKeyDown="resetError()" @insertedValue="($event) => { confirmPassword = $event }" />
        </div>
      </div>
      <p v-show="error.err" class="error">{{ error.text }}</p>
      <ButtonPrimaryVue title="Cadastrar" bgColor="#1976D2" :loader="loader" @click="getUrls()" />
    </div>
    <div class="form creating" :style="{ justifyContent: 'center' }" v-else>
      <div>
        <img src="../images/creating.png" alt="" srcset="">
      </div>
      <h3 class="Congratulations">Parabéns você foi Cadastrado</h3>
      <p class="infos">Agora você pode ter sua própria lista de links encurtados e verificar quais são os mais visitados</p>
      <ButtonPrimaryVue title="Fazer Login" bgColor="#1976D2" @click="getUrls()" />
    </div>

  </div>
  <!-- <div>
        <label>senha</label>
       <input type="password" />
       <label  >email</label>
       <input type="text" />
       <button @click="getUrls" >enviar</button>
    </div> -->
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
  padding: 20px 50px;
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


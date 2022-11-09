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
          <InputCustom placeholder="Digite seu email" @onKeyDown="resetError()" type="email" @insertedValue="($event) => { email = $event }" />
          <label for="password" class="labelForm">Senha</label>
          <InputCustom placeholder="Crie sua senha de acesso" type="password" @onKeyDown="resetError()" @insertedValue="($event) => { password = $event }" />
          <label for="confirmPassword" class="labelForm">Repita Senha</label>
          <InputCustom placeholder="Repita a senha anterior" type="password" @onKeyDown="resetError()" @insertedValue="($event) => { confirmPassword = $event }" />
        </div>
      </div>
      <p v-show="error.err" class="error">{{ error.text }}</p>
      <ButtonPrimaryVue title="Cadastrar" bgColor="#1976D2" :loader="loader" @click="register()" />
    </div>
    <div class="form creating" :style="{ justifyContent: 'center' }" v-else>
      <div>
        <img src="../images/creating.png" alt="" srcset="">
      </div>
      <h3 class="Congratulations">Parabéns você foi Cadastrado</h3>
      <p class="infos">Agora você pode ter sua própria lista de links encurtados e verificar quais são os mais visitados</p>
      <router-link to="/login">
        <ButtonPrimaryVue title="Fazer Login" bgColor="#1976D2" />
      </router-link>
    </div>
  </div>
</template>
<script src="./index.js"></script >
<style lang="css" src="./index.css" scoped>

</style>

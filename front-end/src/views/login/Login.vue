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
      <ButtonPrimaryVue title="Entrar" bgColor="#1976D2" :loader="loader" @click="login()" />
    </div>
  </div>
</template>
<script src="./index.js"></script >
<style lang="css" src="./index.css" scoped>

</style>

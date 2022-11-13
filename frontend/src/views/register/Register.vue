<template>
  <div class="container">
    <div>
      <router-link to="/login">
        <button class="btnLogin">{{ $t("login") }}</button>
      </router-link>
    </div>
    <div class="form" v-if="!sucess">
      <div>
        <h2 class="titleMain">{{ $t("signUp") }}</h2>
        <div class="fieldsForm">
          <label for="email" class="labelForm">{{ $t("email") }}</label>
          <InputCustom placeholder="Digite seu email" @onKeyDown="resetError()" type="email" @insertedValue="($event: string) => { email = $event }" />
          <label for="password" class="labelForm">{{ $t("password") }}</label>
          <InputCustom placeholder="Crie sua senha de acesso" type="password" @onKeyDown="resetError()" @insertedValue="($event: string) => { password = $event }" />
          <label for="confirmPassword" class="labelForm">{{ $t("repeatPassword") }}</label>
          <InputCustom placeholder="Repita a senha anterior" type="password" @onKeyDown="resetError()" @insertedValue="($event: string) => { confirmPassword = $event }" />
        </div>
      </div>
      <p v-show="error.err" class="error">{{ error.text }}</p>
      <ButtonPrimaryVue title="register" bgColor="#1976D2" :loader="loader" @click="register()" />
    </div>
    <div class="form creating" :style="{ justifyContent: 'center' }" v-else>
      <div>
        <congratulationsVue />
        <img src="../../images/creating.png" alt="imagem de parabens ao criar conta" />
      </div>
      <h3 class="Congratulations">{{ $t("HappyBirthday") }}</h3>
      <p class="infos">{{ $t("textInfo") }}</p>
      <router-link to="/login">
        <ButtonPrimaryVue title="Fazer Login" bgColor="#1976D2" />
      </router-link>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script >
<style lang="scss" src="./index.scss" scoped>

</style>

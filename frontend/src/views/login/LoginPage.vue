<template>
  <div class="container">
    <div>
      <router-link to="/register">
        <button class="btnLogin" id="register">
          {{ $t("signUp") }}
        </button>
      </router-link>
    </div>
    <div class="form">
      <div>
        <h2 class="titleMain">{{ $t("login") }}</h2>
        <div class="fieldsForm">
          <label for="email" class="labelForm">{{ $t("email") }}</label>
          <InputCustom
            id="emailLogin"
            placeholder="Digite seu email"
            type="email"
            @insertedValue="($event: string) => { email = $event }"
          />
          <label for="password" class="labelForm">{{ $t("password") }}</label>
          <InputCustom
            id="passwordLogin"
            placeholder="Crie sua senha de acesso"
            type="password"
            @onKeyDown="resetError()"
            @insertedValue="($event: string) => { password = $event }"
          />
        </div>
      </div>
      <p v-show="error.err" class="error">{{ error.text }}</p>
      <ButtonPrimaryVue
        id="buttonLogin"
        title="logIn"
        bgColor="#1976D2"
        :loader="loader"
        @click="login()"
      />
    </div>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="scss" src="./index.scss" scoped></style>

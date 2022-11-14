<template>
  <main class="box404">
    <img src="../../images/404.png" alt="imagem 404" />
    <h1>{{ $t("404") }}</h1>
    <router-link to="/">
      <button class="btnLogin" id="buttonHome">
        {{ $t("button404") }}
      </button>
    </router-link>
  </main>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "page-not-found",
  title: "page not found",
});
</script>
<style scoped lang="scss">
.btnLogin {
  margin-right: 0px;
  margin-top: 50px;
  color: "#5B5959";
  font-size: 16px;
  padding: 12px 30px;
  background-color: #e8e8e8;
  border-radius: 50px;
  border: 1px solid #5b5959;
  cursor: pointer;
}

.box404 {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-color: #459649;

  h1 {
    font-size: 28px;
    font-weight: 800;
  }

  img {
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
  }
}
</style>

<template>
  <div>
    <Modal category="all" :title="smallUrl(urlModal.longURL)" @close="showModal = false" v-if="showModal" :url="urlModal" />
    <main class="container">
      <div>
        <div v-if="!$store.state.logged">
          <router-link to="/register">
            <button class="btnLogin">
              {{ $t("signUp") }}
            </button>
          </router-link>
          <router-link to="/login">
            <button class="btnLogin">
              {{ $t("login") }}
            </button>
          </router-link>
        </div>
        <div v-else>
          <router-link to="/list">
            <button class="btnLogin">
              {{ $store.state.userEmail }}
            </button>
          </router-link>
        </div>

      </div>
      <div class="form">
        <div class="fieldsForm">
          <div class="fieldInput">
            <InputCustom placeholder="Cole sua URL aqui" type="email" @insertedValue="($event: any) => { url = $event }" />
          </div>
          <div class="buttonInput">
            <ButtonPrimaryVue title="shortenLink" @click="submitUrl()" :loader="loader" />
          </div>

        </div>
        <p v-if="!error.err && shortUrl !== ''">
          {{ $t("shortenedLink") }}:
          <a :href="shortUrl" class="text-primary">{{ shortUrl }}</a>
        </p>
        <p v-show="false" class="error">error.text </p>

      </div>
      <div class="form">
        <div>
          <div class="fieldsTable">
            <h2 class="titleMain">{{ urls.length ? $t("theMostVisited") : $t("noLinks") }}</h2>
            <div class="table" v-show="urls.length">
              <div class="tableHeader">
                <div class="fieldTable">
                  <h4>{{ $t("visits") }}</h4>
                </div>
                <div class="fieldTable long">
                  <h4>{{ $t("originalUrl") }}</h4>
                </div>
                <div class="fieldTable shortened" :style="{ display: 'flex', justifyContent: 'flex-start' }">
                  <h4>{{ $t("shortenedLink") }}</h4>
                </div>
              </div>
              <div>
                <div class="tableHeader click" @click="openModal(url)" v-for="(url, index) in urls" :key="index" :style="{
                  backgroundColor: index % 2 ? '#fff' : '#EEF1F2'
                }">
                  <div class="fieldTable">
                    <p class="textTable">{{ url.visits }}</p>
                  </div>
                  <div class="fieldTable long">
                    <p class="textTable ">{{ mediumURL(url.longURL) }}</p>
                  </div>
                  <div class="fieldTable shortened">
                    <a :href="url.shortURL" target="_blank" :style="{ textDecoration: 'none' }">{{ url.shortURL }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss" scoped>

</style>

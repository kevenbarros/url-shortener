<template>
  <main class="container">
    <div>
      <router-link to="/">
        <button class="btnLogin">
          Todas as URls
        </button>
      </router-link>
    </div>
    <div class="form">

      <div class="fieldsForm">
        <div class="fieldInput">
          <InputCustom placeholder="Cole sua URL aqui" type="email" @insertedValue="($event) => { url = $event }" />
        </div>
        <div class="buttonInput">
          <ButtonPrimaryVue title="Encurtar link" @click="submitUrl()" bgColor="#1976D2" :loader="loader" />
        </div>

      </div>
      <p v-if="!error.err && shortUrl !== ''">
        Short URL: :
        <a :href="shortUrl" class="text-primary">{{ shortUrl }}</a>
      </p>
      <p v-show="false" class="error">error.text </p>

    </div>
    <div class="form">
      <div>
        <div class="fieldsTable">
          <h2 class="titleMain">Seus Links Encurtados</h2>
          <div class="table">
            <div class="tableHeader">
              <div class="fieldTable" :style="{ width: '10%' }">
                <h4>Visitas</h4>
              </div>
              <div class="fieldTable long">
                <h4>Url original</h4>
              </div>
              <div class="fieldTable shortened" :style="{ width: '30%', display: flex, justifyContent: 'flex-start' }">
                <h4>Link encurtado</h4>
              </div>
              <div class="fieldTable long" :style="{ width: '20%' }">
                <div></div>
              </div>
            </div>
            <div>
              <div class="tableHeader" v-for="(url, index) in urls" :key="index" :style="{
                backgroundColor: index % 2 ? '#fff' : '#EEF1F2'
              }">
                <div class="fieldTable" :style="{ width: '10%' }">
                  <p class="textTable">{{ url.visits }}</p>
                </div>
                <div class="fieldTable long">
                  <p class="textTable ">{{ url.longURL }}</p>
                </div>
                <div class="fieldTable shortened" :style="{ width: '30%' }">
                  <a :href="url.shortURL" target="_blank" :style="{ textDecoration: 'none' }">{{ url.shortURL }}</a>
                </div>
                <div class="fieldTable" :style="{ width: '20%', display: flex, justifyContent: 'flex-end' }">
                  <p class="textTable copy long" @click="deleteUrl(url._id)">
                    <CIcon name="cil-trash" height="20" />
                    Apagar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script src="./index.js"></script >
<style lang="css" src="./index.css" scoped>

</style>

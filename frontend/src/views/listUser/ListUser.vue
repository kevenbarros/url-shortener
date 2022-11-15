<template>
  <div>
    <Modal
      category="user"
      :title="smallUrl(urlModal.longURL)"
      @close="showModal = false"
      v-if="showModal"
      :url="urlModal"
      @delete="deleteUrl(urlModal._id)"
    />
    <main class="container">
      <div class="buttonsHeader">
        <router-link to="/">
          <button class="btnLogin">
            {{ $t("allUrls") }}
          </button>
        </router-link>
        <button id="logout" class="btnLogin" @click="logout">
          {{ $t("exit") }}
        </button>
      </div>
      <div class="form">
        <div class="fieldsForm">
          <div class="fieldInput">
            <InputCustom
              id="inputUrl"
              placeholder="Cole sua URL aqui"
              type="email"
              @insertedValue="($event: string) => { url = $event }"
              @onKeyDown="() => clearErrors()"
            />
            <p v-if="!error.err && shortUrl !== ''" class="currentLink">
              {{ $t("shortenedLink") }}:
              <a :href="shortUrl" id="shortLink" class="text-primary">{{
                shortUrl
              }}</a>
            </p>
            <p v-else class="error">{{ error.text }}</p>
          </div>
          <div class="buttonInput">
            <ButtonPrimaryVue
              id="submitUrl"
              title="shortenLink"
              @click="submitUrl()"
              bgColor="#1976D2"
              :loader="loader"
            />
          </div>
        </div>
      </div>
      <div class="form" v-if="!loadingTable">
        <div>
          <div class="fieldsTable">
            <h2 class="titleMain">
              {{ urls.length ? $t("yourShortenedLinks") : $t("noLinks") }}
            </h2>
            <div class="table" v-show="urls.length">
              <div class="tableHeader">
                <div class="fieldTable">
                  <h4>{{ $t("visits") }}</h4>
                </div>
                <div class="fieldTable long">
                  <h4>{{ $t("originalUrl") }}</h4>
                </div>
                <div class="fieldTable shortened">
                  <h4>{{ $t("shortenedLink") }}</h4>
                </div>
              </div>
              <div>
                <div
                  class="tableHeader click"
                  @click="openModal(url)"
                  v-for="(url, index) in urls"
                  :key="index"
                  :id="`item_table_${index}`"
                  :style="{
                    backgroundColor: index % 2 ? '#fff' : '#EEF1F2',
                  }"
                >
                  <div class="fieldTable">
                    <p class="textTable">{{ url.visits }}</p>
                  </div>
                  <div class="fieldTable long">
                    <p class="textTable">{{ url.longURL }}</p>
                  </div>
                  <div class="fieldTable shortened">
                    <a
                      :href="url.shortURL"
                      target="_blank"
                      :style="{ textDecoration: 'none' }"
                      >{{ url.shortURL }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="loading" v-else>
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts" src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>

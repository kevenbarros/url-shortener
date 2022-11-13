<template>
  <div class="boxModal taggd" @click="(e: Event) => closeOutside(e)">
    <div class="boxContent">
      <div class="title">
        <h2>
          {{ title }}
        </h2>
        <div @click="close()">
          <CIcon name="cil-x-circle" height="30" />
        </div>
      </div>

      <div class="fields">
        <div class="fieldsModal">
          <h3>{{ $t("originalUrl") }}</h3>
          <h4>{{ url.longURL }}</h4>
        </div>
        <div class="fieldsModal">
          <h3>{{ $t("shortenedLink") }}</h3>
          <a :href="url.shortURL" class="text-primary">{{ url.shortURL }}</a>
        </div>
        <div class="visitsCopy">
          <div>
            <h3>{{ $t("visits") }}</h3>
            <h4>{{ url.visits }}</h4>
          </div>
          <div v-if="category === 'all'" class="copy" @click="copyLink(url.shortURL)">
            <h3>{{ $t("copy") }}</h3>
            <CIcon name="cil-clone" height="20" />
          </div>
          <div v-else class="copy" @click="emitDelete()">
            <h3>{{ $t("delete") }}</h3>
            <CIcon name="cil-trash" height="20" />
          </div>
        </div>
      </div>
      <div class="exit">
        <ButtonPrimary title="sair" bgColor="#1976D2" @click="close()" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts">

</script>
<style lang="scss" src="./index.scss" scoped>

</style>

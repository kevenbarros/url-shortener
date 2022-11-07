<script>
import axios from "axios";
import ButtonPrimaryVue from '../components/buttonPrimary/ButtonPrimary.vue'
import InputCustom from '../components/inputCustom/InputCustom.vue'
import api from '../services/api'
export default {
  components: {
    ButtonPrimaryVue, InputCustom,
  },
  data: () => {
    return {
      url: "",
      shortUrl: "",
      id: "",
      urls: [],
      email: '',
      password: '',
      loader: false,
      error: { err: false, text: "" },
    };
  },
  methods: {
    async getUrls() {
      const response = await api.get("/urlGetAll")
      if (response.status === 200) {
        this.urls = response.data
      }
      console.log(this.urls)
    },
    async sub() {
      try {
        this.id = localStorage.getItem("userId") || ""
        console.log(this.id)
        const api = "http://localhost:5000/url";
        const response = await axios.post(api, {
          url: this.url, userId: this.id

        });
        this.getUrls()
        this.shortUrl = response.data.shortUrl;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getUrls()
  }
};
</script>

<template>
  <main class="container">
    <div>
      <router-link to="/register">
        <button class="btnLogin">
          Fazer Cadastro
        </button>
      </router-link>
    </div>
    <div class="form">

      <div class="fieldsForm">
        <div class="fieldInput">
          <InputCustom placeholder="Cole sua URL aqui" type="email" @insertedValue="($event) => { url = $event }" />
        </div>
        <div class="buttonInput">
          <ButtonPrimaryVue title="Encurtar link" @click="sub()" bgColor="#1976D2" :loader="loader" />
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
                  <p class="textTable copy long">
                    <img src="../images/copiar.png"> Copiar
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    <!-- <div>
      <div class="row">
        <div class="col col-12 offset-0 mt-2">
          <h1 class="jumbotron text-center text-white bg-primary">Create Click-Worthy Links</h1>
        </div>
      </div>
      <div class="col col-8 align-middle mt-5 offset-2">
        <div class="card">
          <div class="card-body">

            <div class="form-group">
              <label for="url">Enter Url</label>
              <textarea type="url" class="form-control" v-model="url" style="height:150px" />
              <textarea type="id" class="form-control" v-model="id" style="height:150px" />
            </div>
            <div class="for-group" v-show="shortUrl">
              <p>
                Short URL: :
                <a :href="shortUrl" class="text-primary">{{ shortUrl }}</a>
              </p>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" @click="sub()">Shorten URl</button>
            </div>

          </div>
        </div>
      </div> 
    </div>-->

  </main>
</template>
<style scoped>
.container {
  padding: 15px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.form {
  width: 100%;
  padding: 0px 50px;
  align-self: center;
}

.fieldsForm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 21px;
}

.fieldsTable {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 21px;
}

.tableHeader {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}

.fieldTable {
  width: 100%;
  padding: 22px 10px;
  display: flex;
  justify-content: flex-start;
}

.textTable {
  font-size: 16px;
  font-weight: 400;
}

.fieldInput {
  width: 100%;
}

.buttonInput {
  white-space: nowrap;
}

.titleMain {
  font-size: 32px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 20px;
}

.btnLogin {
  margin-right: 50px;
  margin-bottom: 50px;
  color: '#5B5959';
  font-size: 16px;
  padding: 12px 30px;
  background-color: #FFFFFF;
  border-radius: 50px;
  border: 1px solid #5B5959;
  cursor: pointer;
}

h4 {
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

.error {
  color: #F55653;
  margin-bottom: 20px;
}

.copy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

@media only screen and (max-width: 1000px) {
  .shortened {
    width: 100%;
  }

  .long {
    width: 0px;
    display: none !important;
  }

  .form {
    width: 100%;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
  }

  .buttonInput {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fieldsForm {
    flex-direction: column;
  }

  .container {
    padding: 20px 0px;
    align-items: center;
  }

  .titleMain {
    text-align: center;
  }

  .btnLogin {
    margin-right: 0;
  }
}
</style>

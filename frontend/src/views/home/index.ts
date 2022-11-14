import ButtonPrimaryVue from "../../components/buttonPrimary/ButtonPrimary.vue";
import InputCustom from "../../components/inputCustom/InputCustom.vue";
import { defineComponent } from "vue";
import { GetAllUrls, PostUrl } from "../../services/serviceUrl";
import Modal from "../../components/modal/Modal.vue";

declare interface Urls {
  visits: number;
  longURL: string;
  shortURL: string;
}
interface Data {
  url: string;
  shortUrl: string;
  urls: Array<Urls>;
  email: string;
  password: string;
  logged: boolean;
  loader: boolean;
  urlModal: Urls;
  showModal: boolean;
  error: {
    err: boolean;
    text: string;
  };
}
export default defineComponent({
  name: "home-view",
  title: "Home",
  components: {
    ButtonPrimaryVue,
    InputCustom,
    Modal,
  },
  data: (): Data => {
    return {
      showModal: false,
      urlModal: {
        visits: 0,
        longURL: "",
        shortURL: "",
      },
      url: "",
      shortUrl: "",
      urls: [],
      email: "",
      password: "",
      logged: false,
      loader: false,
      error: { err: false, text: "" },
    };
  },
  methods: {
    openModal(data: Urls): void {
      this.showModal = true;
      this.urlModal = data;
    },
    smallUrl(longURL: string): string {
      const urlMain = longURL.split("/");
      const site = urlMain[2];
      return site;
    },
    mediumURL(longURL: string): string {
      const urlMain = longURL.split("/");
      const site = urlMain[2];
      const page = urlMain[3];
      return `${site}/${page}`;
    },
    async getUrls(): Promise<void> {
      const response = await GetAllUrls();
      if (Number(response.status) === 200) {
        this.urls = response.body;
        return;
      }
      this.$toast("Algo de errado ocorreu :(", { type: "error" });
    },
    async submitUrl(): Promise<void> {
      if (this.url.trim() == "") return;
      this.loader = true;
      const response = await PostUrl({
        url: this.url,
        userId: this.$store.state.userId,
      });
      this.loader = false;
      if (Number(response.status) === 200) {
        this.getUrls();
        this.shortUrl = response.body.shortUrl;
        this.$toast("Url Encurtada com sucesso", { type: "success" });
        return;
      }
      (this.error = { err: true, text: "não foi possivel criar sua url" }),
        this.$toast("Algo de errado ocorreu, tente novamente", {
          type: "error",
        });
      return;
    },
  },
  mounted() {
    this.logged = this.$store.state.logged;
    this.getUrls();
  },
});

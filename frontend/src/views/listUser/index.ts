import ButtonPrimaryVue from "../../components/buttonPrimary/ButtonPrimary.vue";
import InputCustom from "../../components/inputCustom/InputCustom.vue";
import { defineComponent } from "vue";
import { DeleteUrl, GetUserUrl, PostUrl } from "../../services/serviceUrl";
import Modal from "../../components/modal/ModalCustom.vue";

declare interface Urls {
  visits: number;
  longURL: string;
  shortURL: string;
  _id: string;
}
interface Data {
  url: string;
  shortUrl: string;
  urls: Array<Urls>;
  id: string;
  email: string;
  password: string;
  loader: boolean;
  loadingTable: boolean;
  urlModal: Urls;
  showModal: boolean;
  error: {
    err: boolean;
    text: string;
  };
}
export default defineComponent({
  name: "my-list",
  title: "My list",
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
        _id: "",
      },
      url: "",
      shortUrl: "",
      id: "",
      urls: [],
      email: "",
      password: "",
      loader: false,
      loadingTable: true,
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
    async logout() {
      await this.$store.commit("login", {
        token: "",
        person: {
          _id: "",
          email: "",
        },
      });
      await this.$store.commit("logged", false);
      sessionStorage.clear();
      this.$router.push("/");
    },
    async deleteUrl(url: string): Promise<void> {
      const response = await DeleteUrl(`/${this.$store.state.userId}/${url}`);
      if (Number(response.status) === 200) {
        this.urls = response.body;
        this.$toast("Link deletado com sucesso", { type: "success" });
        return;
      }
      this.$toast("Algo de errado ocorreu, tente novamente", { type: "error" });
    },
    async getUrls(): Promise<void> {
      this.loadingTable = true;
      const response = await GetUserUrl(this.$store.state.userId);
      if (Number(response.status) === 200) {
        this.urls = response.body;
        this.urls.sort((a: Urls, b: Urls) => {
          return b.visits - a.visits;
        });
        this.loadingTable = false;
        return;
      }
      this.$toast("Algo de errado ocorreu :(", { type: "error" });
    },

    async submitUrl(): Promise<void> {
      if (this.url.trim() === "") return;
      this.shortUrl = "";
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
        this.openModal({
          visits: 0,
          longURL: this.url,
          shortURL: this.shortUrl,
          _id: "",
        });
        return;
      }
      this.error = {
        err: true,
        text: response.body.msg,
      };
      this.$toast(response.body.msg, {
        type: "error",
      });
    },
    clearErrors(): void {
      this.error = {
        err: false,
        text: "",
      };
    },
  },
  mounted() {
    this.getUrls();
  },
});

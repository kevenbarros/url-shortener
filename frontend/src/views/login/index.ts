import ButtonPrimaryVue from "../../components/buttonPrimary/ButtonPrimary.vue";
import InputCustom from "../../components/inputCustom/InputCustom.vue";
import { Login } from "../../services/serviceUser";
import { defineComponent } from "vue";

interface Data {
  email: string;
  password: string;
  loader: boolean;
  error: {
    err: boolean;
    text: string;
  };
}

export default defineComponent({
  name: "login-component",
  title: "Login",
  components: {
    ButtonPrimaryVue,
    InputCustom,
  },
  data: (): Data => {
    return {
      email: "",
      password: "",
      loader: false,
      error: { err: false, text: "" },
    };
  },
  methods: {
    resetError(): void {
      this.error = { err: false, text: "" };
    },
    async login(): Promise<void> {
      if (!this.email || !this.password) return;
      this.loader = true;
      const response = await Login({
        email: this.email,
        password: this.password.trim(),
      });
      this.loader = false;
      if (Number(response.status) === 201) {
        sessionStorage.setItem("token", response.body.token);
        sessionStorage.setItem("userId", response.body.person._id);
        sessionStorage.setItem("userEmail", response.body.person.email);
        await this.$store.commit("login", response.body);
        this.$router.push("/list");
        this.$toast("Bem-vindo :)", { type: "success" });
        return;
      }
      this.$toast("Algo de errado ocorreu, tente novamente", { type: "error" });
      this.error = {
        err: true,
        text: "Não foi possivel fazer login, contate o suporte",
      };
      return;
    },
  },
});

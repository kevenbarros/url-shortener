import ButtonPrimaryVue from "../../components/buttonPrimary/ButtonPrimary.vue";
import InputCustom from "../../components/inputCustom/InputCustom.vue";
import { defineComponent } from "vue";
import { Register } from "../../services/serviceUser";

interface Data {
  confirmPassword: string;
  email: string;
  password: string;
  loader: boolean;
  sucess: boolean;
  error: {
    err: boolean;
    text: string;
  };
}

export default defineComponent({
  name: "register-components",
  title: "Register",
  components: {
    ButtonPrimaryVue,
    InputCustom,
  },
  data: (): Data => {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      sucess: false,
      loader: false,
      error: { err: false, text: "" },
    };
  },
  methods: {
    validateEmail(email: string): boolean {
      const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      return regex.test(email);
    },
    resetError(): void {
      this.error = { err: false, text: "" };
    },
    async register(): Promise<void> {
      if (this.password.trim() !== this.confirmPassword.trim()) {
        this.error = { err: true, text: "Senhas não são iguais" };
        return;
      }
      if (!this.validateEmail(this.email.trim())) {
        this.error = { err: true, text: "Email Invalido!" };
        return;
      }
      this.loader = true;
      const response = await Register({
        email: this.email,
        password: this.password.trim(),
      });
      this.loader = false;
      if (Number(response.status) === 201) {
        this.sucess = true;
        return;
      }
      this.$toast("Algo de errado ocorreu, tente novamente", { type: "error" });
      this.error = {
        err: true,
        text: "Não foi possivel criar sua conta, contate o suporte",
      };
    },
  },
});

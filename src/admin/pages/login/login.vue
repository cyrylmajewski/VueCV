<template>
  <div class="login-page-component">
    <div class="content">
      <form class="form" @submit.prevent="handleSubmit">
        <div class="form-title">Авторизация</div>
        <div class="row">
          <app-input
              title="Логин"
              icon="user"
              v-model="user.name"
              :error-message="validation.firstError('user.name')"
          />
        </div>
        <div class="row">
          <app-input
              title="Пароль"
              icon="key"
              type="password"
              v-model="user.password"
              :error-message="validation.firstError('user.password')"
          />
        </div>
        <div class="btn">
          <app-button :disabled="isSubmitDisabled" typeAttr="submit" title="Отправить"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import appInput from "../../components/input";
import appButton from "../../components/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import $axios from "../../requests";
import { mapActions } from "vuex";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "user.name": value => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": value => {
      return Validator.value(value).required("Введите пароль");
    },
  },
  data: () => ({
    user: {
      name: "",
      password: "",
    },
    isSubmitDisabled: false
  }),
  components: {appButton, appInput},
  methods: {
    ...mapActions({
      showToolTip: "tooltips/show",
      login: "user/login",
    }),
    async handleSubmit() {
      if(await this.$validate() === false) return;
        this.isSubmitDisabled = true;
        try {
          const response = await $axios.post( "/login", this.user);
          const token = response.data.token;
          localStorage.setItem("token", token);
          $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

          const userResponse = await $axios.get('/user');
          this.login(userResponse.data.user);

          this.showToolTip({
            text: "Вход выполнен успешно",
            type: "success",
          });
          await this.$router.replace('/');
        } catch (error) {
          this.showToolTip({
            text: error.response.data.error,
            type: "error"
          })
          console.log(error.response.data.error);
        } finally {
          this.isSubmitDisabled = false;
        }
    }
  }
}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>

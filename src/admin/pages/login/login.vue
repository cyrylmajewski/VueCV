<template>
  <div class="login-page-component">
    <div class="content">
      <div class="form">
        <div class="form-title">Авторизация</div>
        <div class="row">
          <app-input title="Логин" icon="user"/>
        </div>
        <div class="row">
          <app-input title="Пароль" icon="key" type="password"/>
        </div>
        <div class="btn">
          <app-button title="Отправить"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appInput from "../../components/input";
import appButton from "../../components/button";

export default {
  data: () => ({}),
  components: {appButton, appInput},
}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>

<template>
  <div class="header-component">
    <headline title="Панель администрирования">
      <user />
    </headline>
    <navigation />
  </div>
</template>


<script>
import headline from "../headline";
import User from "../user";
import navigation from "../navigation";

export default {
  components: {
    headline, User, navigation
  }
}
</script>

<style lang="postcss" scoped src="./header.pcss"></style>

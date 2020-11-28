<template>
  <nav class="navigation-component">
    <div class="container">
      <ul class="list">
        <li
            :class="['item', {active: link.active}]"
            v-for="link in links"
            :key="link.id">
          <router-link active-class="active" exact :to="`/${link.alias}`" class="link">
            {{link.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
const links = [
  {id: 0, title: "Обо мне", alias: "", active: false},
  {id: 1, title: "Работы", alias: "works", active: true},
  {id: 2, title: "Отзывы", alias: "reviews", active: false},
]

export default {
  data() {
    return {
      links
    }
  }
}
</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>

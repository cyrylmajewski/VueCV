<template>
  <card simple>
    <div class="works-wrapper">
      <div class="pic">
        <img class="image" :src="cover"/>
        <div class="tag">
          <tags-list :tags="currentWork.techs"/>
        </div>
      </div>
      <div class="data">
        <div class="title">{{currentWork.title}}</div>
        <div class="text">
          <p>{{currentWork.description}}</p>
        </div>
        <a :href="work.link" class="link">{{currentWork.link}}</a>
        <div class="btns">
          <icon
              symbol="pencil"
              title="Править"
              @click="editCurrentWork"
          ></icon>
          <icon
              symbol="trash"
              title="Удалить"
              @click="$emit('delete-work', currentWork.id)"
          ></icon>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import card from "../Card";
import icon from "../icon";
import tagsList from "../tagsList";
import { mapActions } from "vuex";

export default {
  components: { card, icon, tagsList },
  props: {
    work: Object,
  },
  data() {
    return {
      currentWork: {
        title: this.work.title,
        link: this.work.link,
        description: this.work.description,
        techs: this.work.techs,
        id: this.work.id,
        photo: this.work.photo,
        preview: "",
      }
    }
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`
    }
  },
  methods: {
    ...mapActions({
      editCurrentWorkAction: "works/setCurrentWork"
    }),
    editCurrentWork() {
      this.$emit('set-edit-mode');
      this.editCurrentWorkAction(this.currentWork);
    }
  }
};
</script>

<style scoped lang="postcss" src="./workCard.pcss"></style>

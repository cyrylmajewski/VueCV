<template>
  <card simple>
    <div class="review-wrapper">
      <div class="review-user">
        <img class="image" :src="cover" />
        <div class="user-data">
          <div class="user-name">{{currentReview.author}}</div>
          <div class="user-title">{{currentReview.occ}}</div>
        </div>
      </div>
      <div class="data">
        <div class="text">
          <p>{{currentReview.text}}</p>
        </div>
        <div class="btns">
          <icon
              symbol="pencil"
              title="Править"
              @click="editCurrentReview"
          ></icon>
          <icon
              symbol="cross"
              title="Удалить"
              @click="$emit('delete-review', currentReview.id)"
          ></icon>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import Card from "../Card/card";
import icon from "../icon";
import {mapActions} from "vuex";

export default {
  components: {Card, icon},
  props: {
    review: Object,
  },
  data() {
    return {
      currentReview: {
        photo: this.review.photo,
        author: this.review.author,
        occ: this.review.occ,
        text: this.review.text,
        preview: this.review.preview,
        id: this.review.id
      }
    }
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.currentReview.photo}`
    }
  },
  methods: {
    ...mapActions({
      editCurrentWorkAction: "reviews/setCurrentReview"
    }),
    editCurrentReview() {
      this.$emit('set-edit-mode');
      this.editCurrentWorkAction(this.currentReview);
    }
  }
}
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>
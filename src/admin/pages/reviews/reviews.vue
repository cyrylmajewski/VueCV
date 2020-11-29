<template>
  <div class="reviews-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <div class="page-title">Блок "Отзывы"</div>
        </div>
        <div class="form">
          <app-form
              v-if="editMode"
              :editMode="editMode"
              @off-edit-mode="editMode = false"
              @cancel="editMode = false"
          />
          <app-form
              v-if="createMode"
              @cancel="createMode = false"
              @off-create-mode="createMode = false"
          />
        </div>
        <ul class="cards">
          <li class="item">
            <square-btn
                type="square"
                title="Добавить отзыв"
                @click="createMode=!createMode"
            />
          </li>
          <li class="item" v-for="review in reviews" :key="review.id">
            <review-card
                :review="review"
                @delete-review="deleteReview"
                @set-edit-mode="editMode = !editMode"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import appForm from "../../components/reviewForm";
import SquareBtn from "../../components/button/types/squareBtn/squareBtn";
import reviewCard from "../../components/reviewCard";
import { mapActions, mapState } from "vuex";

export default {
  components: {appForm, SquareBtn, reviewCard},
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
  },
  data() {
    return {
      editMode: false,
      createMode: false,
    }
  },
  methods: {
    ...mapActions({
      fetchReviews: "reviews/fetch",
      deleteReviewAction: "reviews/delete"
    }),
    async deleteReview(reviewID) {
      await this.deleteReviewAction(reviewID);
    }
  },
  mounted() {
    this.fetchReviews();
  }
}
</script>

<style lang="postcss" src="./reviews.pcss" scoped>

</style>

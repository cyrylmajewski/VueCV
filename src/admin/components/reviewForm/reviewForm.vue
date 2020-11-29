<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Добавление">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label>
                <div
                    :style="{backgroundImage: cover}"
                    :class="['uploader-img', {active: newReview.preview}, {
                    hovered: hovered}]"
                    @dragover="handleDragOver"
                    @dragleave="hovered = false"
                    @drop="handleChange"></div>
                <div class="uploader-btn">
                  <app-button
                      title="Добавить фото"
                      typeAttr="file"
                      plain
                      @change="handleChange"
                  ></app-button>
                </div>
              </label>
            </div>
            <div class="form-col">
              <div class="form-row">
                <div class="form-row-col">
                  <app-input v-model="newReview.author" title="Имя автора"/>
                </div>
                <div class="form-row-col">
                  <app-input v-model="newReview.occ" title="Титул автора"/>
                </div>
              </div>
              <div class="form-row">
                <app-input
                    v-model="newReview.text"
                    field-type="textarea"
                    title="Отзыв" />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button
                  title="Отмена"
                  plain
                  @click="$emit('cancel')"
              ></app-button>
            </div>
            <div class="btn">
              <app-button
                  title="Сохранить"
                  typeAttr="submit"
                  v-if="editMode"
              ></app-button>
              <app-button
                  title="Сохранить"
                  typeAttr="submit"
                  v-if="!editMode"
              ></app-button>
            </div>
          </div>
        </div>
      </card>
    </form>
  </div>
</template>


<script>
import card from "../Card";
import appButton from "../button";
import appInput from "../input";
import { mapActions, mapState } from "vuex";

export default {
  components: {card, appButton, appInput},
  props: {
    editMode: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      hovered: false,
      newReview: {
        photo: {},
        author: "",
        occ: "",
        text: "",
        preview: "",
      },
      editModeData: this.editMode,
      uploadedPhoto: false,
    };
  },
  computed: {
    ...mapState("reviews", {
      review: (state) => state.currentReview,
    }),
    cover() {
      if(!this.uploadedPhoto) {
        console.log(this.uploadedPhoto);
        return (this.newReview.preview === "") ? `url("/src/images/content/user-unknown.png")` : `url("https://webdev-api.loftschool.com/${this.newReview.photo}")`;
      } else if(this.uploadedPhoto) {
        console.log(this.uploadedPhoto);
        return `url(${this.newReview.preview})`;
      }
    }
  },
  created() {
    if(this.editModeData) {
      console.log(this.review);
      this.newReview = this.review;
      this.uploadedPhoto = false;
    }
  },
  methods: {
    ...mapActions({
      addNewReview: "reviews/add",
      editReview: "reviews/edit"
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if(this.editModeData) {
        await this.editReview(this.newReview);
        this.editModeData = !this.editModeData;
        this.$emit('off-edit-mode');
      } else {
        await this.addNewReview(this.newReview);
        this.$emit('off-create-mode');
      }
    },
    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer
          ? event.dataTransfer.files[0] : event.target.files[0];

      this.newReview.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
      this.uploadedPhoto = true;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.newReview.preview = reader.result;
      }
    }
  }

}
</script>

<style lang="postcss" src="./reviewForm.pcss" scoped>

</style>
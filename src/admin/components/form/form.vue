<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Добавленные работы">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col">
              <label
                  :style="{backgroundImage: cover}"
                  :class="[ 'uploader', {active: newWork.preview}, {
                    hovered: hovered
                  } ]"
                  @dragover="handleDragOver"
                  @dragleave="hovered = false"
                  @drop="handleChange"
              >
                <span class="uploader-title">
                  Перетащите или загрузите картинку
                </span>
                <span class="uploader-btn">
                  <app-button
                      typeAttr="file"
                      @change="handleChange"
                  ></app-button>
                </span>
              </label>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input
                    v-model="newWork.title"
                    title="Название"
                />
              </div>
              <div class="form-row">
                <app-input v-model="newWork.link" title="Ссылка" />
              </div>
              <div class="form-row">
                <app-input v-model="newWork.description" field-type="textarea" title="Описание" />
              </div>
              <div class="form-row">
                <tags-adder v-model="newWork.techs" title="Добавление тега" />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" @click="$emit('cancel')" plain></app-button>
            </div>
            <div class="btn">
              <app-button
                  title="Сохранить"
                  typeAttr="submit"
                  v-if="!editMode"
              ></app-button>
              <app-button
                  v-if="editMode"
                  title="Сохранить"
                  typeAttr="submit"
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
import tagsAdder from "../tagsAdder";
import { mapActions, mapState } from "vuex";

export default {
  components: {card, appButton, appInput, tagsAdder},
  props: {
    editMode: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapState("works", {
      work: (state) => state.currentWork,
    }),
    cover() {
      if(!this.uploadedPhoto) {
        return `url("https://webdev-api.loftschool.com/${this.newWork.photo}")`;
      } else if(this.uploadedPhoto) {
        return `url(${this.newWork.preview})`;
      }

        // return `url(${this.newWork.preview})`;
    }
  },
  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
      },
      editModeData: this.editMode,
      uploadedPhoto: false,
    };
  },
  created() {
    if(this.editModeData) {
      this.newWork = this.work;
      this.uploadedPhoto = false;
    }
  },
  methods: {
    ...mapActions({
      addNewWork: "works/add",
      editWork: "works/edit"
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if(this.editModeData) {
        await this.editWork(this.newWork);
        this.editModeData = !this.editModeData;
        this.$emit('off-edit-mode');
      } else {
        await this.addNewWork(this.newWork);
        this.$emit('off-create-mode');
      }
    },
    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer
          ? event.dataTransfer.files[0] : event.target.files[0];

      this.newWork.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
      this.uploadedPhoto = true;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.newWork.preview = reader.result;
      }
    }
  }
}

</script>

<style src="./form.pcss" lang="postcss" scoped></style>

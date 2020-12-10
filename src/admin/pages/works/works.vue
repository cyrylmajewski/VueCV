<template>
  <div class="works-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <div class="page-title">Блок "Работы"</div>
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
              @off-create-mode="createMode = false"
              @cancel="createMode = false"
          />
        </div>
        <ul class="cards">
          <li class="item">
            <square-btn
                type="square"
                title="Добавить работу"
                @click="createMode=!createMode"
            />
          </li>
          <li class="item" v-for="work in works" :key="work.id">
            <work-card
                :work="work"
                @delete-work="deleteWork"
                @set-edit-mode="editMode = !editMode"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import appForm from "../../components/form";
import workCard from "../../components/workCard";
import { mapActions, mapState } from "vuex";
import SquareBtn from "../../components/button/types/squareBtn/squareBtn";

export default {
  components: {SquareBtn, appForm, workCard },
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
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
      fetchWorks: "works/fetch",
      deleteWorkAction: "works/delete"
    }),
    async deleteWork(workID) {
      await this.deleteWorkAction(workID);
    }
  },
  mounted() {
    this.fetchWorks();
  }
};
</script>

<style scoped lang="postcss" src="./works.pcss"></style>

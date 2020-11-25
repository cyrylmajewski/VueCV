<template>
  <div class="about-page-component">
    <div class="page-content">
      <div class="container" v-if="categories.length">
        <div class="header">
          <div class="title">Блок "Обо мне"</div>
          <iconed-button
              type="iconed"
              v-if="emptyCatIsShown === false"
              @click="emptyCatIsShown = true"
              title="Добавить группу"
          />
        </div>
        <ul class="skills">
          <li class="item" v-if="emptyCatIsShown">
            <category
                @remove-category="emptyCatIsShown = false"
                @create-category="createCategory"
                empty
            />
          </li>
          <li
              class="item"
              v-for="category in categories"
              :key="category.id"
          >
            <category
                :title="category.category"
                :skills="category.skills"
                @edit-category="editCategory($event, category.id)"
                @create-skill="createSkill($event, category.id)"
                @remove-category="deleteCategory($event, category.id)"
                @edit-skill="editSkill"
                @remove-skill="removeSkill"
            />
          </li>
        </ul>
      </div>
      <div class="container" v-else-if="categories.length === 0">
        <div class="header">
          <div class="title">Блок "Обо мне"</div>
          <iconed-button
              type="iconed"
              v-if="emptyCatIsShown === false"
              @click="emptyCatIsShown = true"
              title="Добавить группу"
          />
        </div>
        <ul class="skills">
          <li class="item" v-if="emptyCatIsShown">
            <category
                @remove-category="emptyCatIsShown = false"
                @create-category="createCategory"
                empty
            />
          </li>
        </ul>
      </div>
      <div class="container" v-else>
        loading...
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "../../components/avatar/avatar.vue";
import headline from "../../components/headline/headline.vue";
import User from "../../components/user/user";
import navigation from "../../components/navigation/navigation";
import button from "../../components/button/button";
import category from "../../components/category/category";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    User,
    avatar,
    headline,
    navigation,
    iconedButton: button,
    category
  },
  data() {
    return {
      emptyCatIsShown: false
    }
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.data
    })
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      editCategoryAction: "categories/edit",
      deleteCategoryAction: "categories/delete",
      fetchCategoriesAction: "categories/fetch",
      addSkillAction: "skills/add",
      removeSkillAction: "skills/remove",
      editSkillAction: "skills/edit",
    }),
    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId
      }
      await this.addSkillAction(newSkill);
      skill.title = "";
      skill.percent = "";
    },
    removeSkill(skill) {
      this.removeSkillAction(skill);
    },
    async editSkill(skill) {
      await this.editSkillAction(skill);
      skill.editmode = false;
    },
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCatIsShown = false;
      } catch (e) {
        console.log(e.message);
      }
    },
    async editCategory(category, categoryId) {
      const titleToEdit = {
        title: category,
        id: categoryId
      }
      await this.editCategoryAction(titleToEdit);
    },
    async deleteCategory(category, categoryId) {
      await this.deleteCategoryAction(categoryId);
    }
  },
  created() {
    this.fetchCategoriesAction();
  }
}
</script>

<style scoped lang="postcss" src="./about.pcss">

</style>

<template>
  <card slim>
    <edit-line
        slot="title"
        v-model="categoryTitle"
        :editModeByDefault="empty"
        @remove="$emit('remove-category', $event)"
        @create="$emit('create-category', $event)"
        @edit="$emit('edit-category', $event)"
    />
    <template slot="content">
      <ul class="skills" v-if="empty === false">
        <li class="item" v-for="skill in skills" :key="skill.id">
          <skill
              :skill="skill"
              @remove="$emit('remove-skill', $event)"
              @approve="$emit('edit-skill', $event)"
          />
        </li>
      </ul>
      <div class="bottom-line">
        <skill-add-line
            @approve="$emit('create-skill', $event)"
            :blocked="empty"
        />
      </div>
    </template>
  </card>
</template>

<script>

import card from "../Card/card";
import editLine from "../editLine/editLine";
import skill from "../skill/skill";
import skillAddLine from "../skillAddLine/skillAddLine";

export default {
  components: {
    card, editLine, skill,
    skillAddLine
  },
  props: {
    empty: Boolean,
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      categoryTitle: this.title
    }
  }
}

</script>

<style lang="postcss">
  .item {
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .bottom-line {
    padding-top: 70px;
    margin-top: auto;
    padding-left: 25%;
  }

</style>

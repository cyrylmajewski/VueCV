<template>
  <div class="skill-component" v-if="currentSkill.editmode === false">
    <div class="title">{{ skill.title }}</div>
    <div class="percent">{{ skill.percent }}</div>
    <div class="buttons">
      <icon symbol="pencil" class="btn" @click="currentSkill.editmode = true" grayscale />
      <icon symbol="trash" class="btn" @click="$emit('remove', currentSkill)" grayscale />
    </div>
  </div>
  <div class="skill-component" v-else>
    <div class="title">
      <app-input
          noSidePaddings
          v-model="currentSkill.title"
          :errorMessage="errorMessageTitle"
      />
    </div>
    <div class="percent">
      <app-input
          :errorMessage="errorMessagePercent"
          v-model="currentSkill.percent"
          type="number"
          min="0"
          max="100"
          maxlength="3"
      />
    </div>
    <div class="buttons">
      <icon symbol="tick" class="btn" @click="onApprove"/>
      <icon symbol="cross" class="btn" @click="currentSkill.editmode = false" />
    </div>
  </div>
</template>

<script>
import input from "../input/input";
import icon from "../icon/icon";

export default {
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true
    },
    errorMessage: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editmode: false
      },
      errorMessageTitle: this.errorMessage,
      errorMessagePercent: this.errorMessage,
    }
  },
  components: {
    icon,
    appInput: input
  },
  methods: {
    onApprove() {
      let flag1 = 0;
      let flag2 = 0;

      if(this.currentSkill.title === "") {
        this.errorMessageTitle = "Введите название";
      }  else {
        flag1 = 1;
      }

      if(this.currentSkill.percent === "") {
        this.errorMessagePercent = "Введите проценты"
      } else {
        flag2 = 1;
      }
      if(flag1 && flag2){
        this.$emit('approve', this.currentSkill);
      }
    },
  }
}
</script>

<style lang="postcss" src="./skill.pcss"></style>

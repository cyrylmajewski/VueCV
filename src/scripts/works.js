import Vue from "vue";

const thumbs = {
    props: ["works", "currentWork"],
    template: "#preview-thumbs"
};

const btns = {
    template: "#preview-btns",
    methods: {
        buttonOff(direction) {
                let btnOff = this.$refs;
                this.$emit('slide',{direction, btnOff} );
        }
    },
    mounted() {
        this.$refs.buttonPrev.classList.add('non-active');
    }
};

const display = {
    props: ["currentWork", "works", "currentIndex"],
    template: "#preview-display",
    components: {thumbs, btns},
    computed: {
        reversedWorks() {
            const works = [...this.works];
            return works.slice(0, 4);
        }
    }
};

const tags = {
    props: ["tags"],
    template: "#preview-tags"
};

const info = {
    props: ["currentWork"],
    template: "#preview-info",
    components: { tags },
    computed: {
        tagsArray() {
            return this.currentWork.skills.split(",");
        }
    }
};

new Vue({
    el: "#preview-component",
    template: "#preview-container",
    components:  {display, info},
    data() {
        return {
            works: [],
            currentIndex: 0
        }
    },
    computed: {
        currentWork() {
          return this.works[this.currentIndex];
        }
    },
    methods: {
        requireImgToArray(data) {
          return data.map(item => {
              const requiredImage = require(`../images/content/${item.photo}`).default;
              item.photo = requiredImage;
              return item
          });
        },
        slide(data) {
            const btnNext = data.btnOff.buttonNext;
            const btnPrev = data.btnOff.buttonPrev;
            switch(data.direction) {
                case "next":
                    if(this.currentIndex === 3) {
                        break;
                    } else if(this.currentIndex === 0) {
                        btnPrev.classList.remove('non-active');
                    }
                    this.currentIndex++;
                    if(this.currentIndex === 3) {
                        btnNext.classList.add('non-active');
                        break;
                    }
                    break;
                case "prev":
                    if(this.currentIndex === 0) {
                        break;
                    } else if(this.currentIndex === 3) {
                        btnNext.classList.remove('non-active');
                    }
                    this.currentIndex--
                    if(this.currentIndex === 0) {
                        btnPrev.classList.add('non-active');
                        break;
                    }
                    break;
            }
        },

    },
    created() {
        const data = require("../data/works.json");
        console.log(data);
        this.works = this.requireImgToArray(data);
    }
})


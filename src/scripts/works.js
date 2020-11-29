import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = 'https://webdev-api.loftschool.com';

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
            return this.currentWork.techs.split(",");
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
            currentIndex: 0,
            download: false,
        }
    },
    computed: {
        currentWork() {
            return (this.download === true) ? this.works[this.currentIndex] : {
                id: 1,
                title: "1 Сайт школы онлайн образования",
                techs: "Html, Css, JavaScript",
                photo: "slider-1.png",
                link: "//google.com",
                description: "1 Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!"
            };
        }
    },
    methods: {
        requireImgToArray(data) {
            return data.map(item => {
                const requiredImage = `https://webdev-api.loftschool.com/${item.photo}`;
                item.photo = requiredImage;
                return item
            });
        },
        slide(data) {
            const btnNext = data.btnOff.buttonNext;
            const btnPrev = data.btnOff.buttonPrev;
            switch(data.direction) {
                case "next":
                    if(this.currentIndex === this.works.length - 1) {
                        break;
                    } else if(this.currentIndex === 0) {
                        btnPrev.classList.remove('non-active');
                    }
                    this.currentIndex++;
                    if(this.currentIndex === this.works.length - 1) {
                        btnNext.classList.add('non-active');
                        break;
                    }
                    break;
                case "prev":
                    if(this.currentIndex === 0) {
                        break;
                    } else if(this.currentIndex === this.works.length - 1) {
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
    async created() {
        // const data = require("../data/works.json");
        const { data } = await axios.get(`/works/423`);
        this.works = await this.requireImgToArray(data);
        this.download = true;
    }
})
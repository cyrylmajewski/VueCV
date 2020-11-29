import Vue from "vue";
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import axios from "axios";

axios.defaults.baseURL = 'https://webdev-api.loftschool.com';

new Vue({
    el: "#slider-component",
    template: "#slider-container",
    components: {
        Swiper, SwiperSlide
    },
    data() {
        return {
            width: 0,
            reviews: [],
            sliderOptions: {
                slidesPerView: 2,
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    480: {
                        slidesPerView: 2
                    }
                }
            },
            sumOfSlides: 0,
            currentIndex: 0,
        }
    },
    methods: {
        updateWidth() {
            this.width = window.innerWidth;
            if(this.width <= 320) {
                this.sumOfSlides = this.$refs.slides.length;
            }
            if(this.width >= 480) {
                this.sumOfSlides = this.$refs.slides.length - 2
            }
        },
        requireImgToArray(data) {
            return data.map((item) => {
                const requiredImage = `https://webdev-api.loftschool.com/${item.photo}`;
                item.photo = requiredImage;
                return item
            });
        },
        slide(direction) {
            const slider = this.$refs["slider"].$swiper;
            const btnNext = this.$refs.buttonNext;
            const btnPrev = this.$refs.buttonPrev;
            const sumOfSlides = this.sumOfSlides - 1
            switch(direction) {
                case "next" :
                    if(this.currentIndex === sumOfSlides) {
                        break;
                    } else if (this.currentIndex === 0) {
                        btnPrev.classList.remove('non-active');
                    }
                    slider.slideNext();
                    this.currentIndex++;
                    if(this.currentIndex === sumOfSlides) {
                        btnNext.classList.add('non-active');
                        break;
                    }
                    break;
                case "prev" :
                    if(this.currentIndex === 0) {
                        break;
                    } else if (this.currentIndex === sumOfSlides) {
                        btnNext.classList.remove('non-active');
                    }
                    slider.slidePrev();
                    this.currentIndex--;
                    if(this.currentIndex === 0) {
                        btnPrev.classList.add('non-active');
                        break;
                    }
                    break;
            }
        }
    },
    async created() {
        window.addEventListener('load', this.updateWidth);
        window.addEventListener('resize', this.updateWidth);
        // const data = require("../data/reviews.json");
        const { data } = await axios.get(`/reviews/423`);
        console.log(data);
        this.reviews = this.requireImgToArray(data);
    },
    mounted() {
        this.$refs.buttonPrev.classList.add('non-active');
    }
});
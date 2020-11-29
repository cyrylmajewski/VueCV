export default {
    namespaced: true,
    state: {
        data: [],
        currentReview: {}
    },
    mutations: {
        ADD_REVIEW(state, newReview) {
            state.data.push(newReview);
        },
        SET_REVIEWS(state, reviews) {
            console.log(reviews);
            state.data = reviews;
        },
        SET_REVIEW(state, reviewToEdit) {
            const findReview = review => {
                if(review.id === reviewToEdit.id) {
                    return reviewToEdit;
                }
            }
            state.data = state.data.map(findReview);
            console.log(reviewToEdit);
        },
        DELETE_REVIEW(state, reviewToDelete) {
            state.data = state.data.filter(review => review.id !== reviewToDelete);
        },
        SET_CURRENT_REVIEW(state, currentReview) {
            state.currentReview = currentReview;
            console.log(state.currentReview.photo);
        }
    },
    actions: {
        async add({ commit }, newReview) {
            console.log(newReview);
            const formData = new FormData();

            Object.keys(newReview).forEach(item => {
                formData.append(item, newReview[item]);
            })

            try {
                const { data } = await this.$axios.post("/reviews", formData);
                commit("ADD_REVIEW", data);
            } catch (e) {
                console.log(e);
            }
        },
        async fetch({ commit }) {
            try {
                const userID = await this.$axios.get('/user').then(response => {
                    return response.data.user.id;
                });
                const { data } = await this.$axios.get(`/reviews/${userID}`);
                commit("SET_REVIEWS", data);
            } catch(e) {
                console.log(e);
            }
        },
        async delete({commit}, reviewID) {
            try {
                const {data} = await this.$axios.delete(`/reviews/${reviewID}`);
                commit("DELETE_REVIEW", reviewID);
            } catch (e) {
                throw new Error("Произошла ошибка");
            }
        },
        setCurrentReview({commit}, currentReview) {
            commit("SET_CURRENT_REVIEW", currentReview);
        },
        async edit({commit}, reviewToEdit) {
            const formData = new FormData();

            Object.keys(reviewToEdit).forEach(item => {
                formData.append(item, reviewToEdit[item]);
            })
            try {
                const {data} = await this.$axios.post(`/reviews/${reviewToEdit.id}`, formData);
                commit("SET_REVIEW", data.review);
            } catch (e) {
                throw new Error("Произошла ошибка");
            }
        }
    }
}
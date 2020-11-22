export default {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        SET_CATEGORIES: (state, categories) => (state.data = categories),
        ADD_CATEGORY: (state, category) => state.data.unshift(category),
        ADD_SKILL: (state, newSkill) => {
            state.data = state.data.map(category => {
                if(category.id === newSkill.category) {
                    category.skills.push(newSkill);
                }

                return category;
            })
        }
    },
    actions: {
        async create({commit}, title) {
            try {
                const {data} = await this.$axios.post('/categories', {title});
                commit("ADD_CATEGORY", data);
            } catch (e) {
                throw new Error("произошла ошибка");
            }
        },
        async fetch({ commit }) {
            try {
                const userID = await this.$axios.get('/user').then(response => {
                   return response.data.user.id;
                });
                const {data} = await this.$axios.get(`/categories/${userID}`);
                commit("SET_CATEGORIES", data);
            } catch (e) {
                console.log(e);
            }
        }
    }
}

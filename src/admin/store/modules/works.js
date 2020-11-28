export default {
    namespaced: true,
    state: {
        data: [],
        currentWork: {},
    },
    mutations: {
        ADD_WORK(state, newWork) {
            state.data.push(newWork);
        },
        SET_WORKS(state, works) {
            console.log(works);
            state.data = works;
        },
        SET_WORK(state, workToEdit) {
            const findWork = work => {
                if(work.id === workToEdit.id) {
                    return workToEdit;
                }
            }
            state.data = state.data.map(findWork);
            console.log(workToEdit);
        },
        DELETE_WORK(state, workToDelete) {
            state.data = state.data.filter(work => work.id !== workToDelete);
        },
        SET_CURRENT_WORK(state, currentWork) {
            state.currentWork = currentWork;
            console.log(state.currentWork.photo);
        }
    },
    actions: {
        async add({ commit }, newWork) {
            const formData = new FormData();

            Object.keys(newWork).forEach(item => {
                formData.append(item, newWork[item]);
            })

            try {
                const { data } = await this.$axios.post("/works", formData);
                commit("ADD_WORK", data);
            } catch (e) {
                console.log(e);
            }
        },

        async fetch({ commit }) {
            try {
                const userID = await this.$axios.get('/user').then(response => {
                    return response.data.user.id;
                });
                const { data } = await this.$axios.get(`/works/${userID}`);
                commit("SET_WORKS", data);
            } catch(e) {
                console.log(e);
            }
        },
        async delete({commit}, workID) {
            try {
                const {data} = await this.$axios.delete(`/works/${workID}`);
                commit("DELETE_WORK", workID);
            } catch (e) {
                throw new Error("Произошла ошибка");
            }
        },
        setCurrentWork({commit}, currentWork) {
            commit("SET_CURRENT_WORK", currentWork);
        },
        async edit({commit}, workToEdit) {
            const formData = new FormData();

            Object.keys(workToEdit).forEach(item => {
                formData.append(item, workToEdit[item]);
            })
            try {
                const {data} = await this.$axios.post(`/works/${workToEdit.id}`, formData);
                commit("SET_WORK", data.work);
            } catch (e) {
                throw new Error("Произошла ошибка");
            }
        }
    }
}

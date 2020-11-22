export default {
    namespaced: true,
    actions: {
        async add({commit}, skill) {
            try {
                const {data} = await this.$axios.post('/skills', skill);
                commit("categories/ADD_SKILL", data, {root: true})
            } catch (e) {
                throw new Error("Ошибка");
            }
        },
        remove() {
            console.log('remove');
        },
        edit() {
            console.log('edit');
        },
    }
}

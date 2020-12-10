import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import axios from "axios";

Vue.use(VueRouter);

import header from "./components/header";
import about from "./pages/about";
import login from "./pages/login";
import works from "./pages/works";
import reviews from "./pages/reviews";

const routes = [
    {
        path: "/",
        components: {
            default: about,
            header: header,
        },
    },
    {
        path: "/login",
        component: login,
        meta: {
            public: true
        }
    },
    {
        path: "/works",
        components: {
            default: works,
            header: header,
        }
    },
    {
        path: "/reviews",
        components: {
            default: reviews,
            header: header,
        }
    }
];

const router = new VueRouter({routes});

const guard = axios.create({
    baseURL: 'https://webdev-api.loftschool.com'
});

router.beforeEach(async (to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLoggedIn = store.getters["user/userIsLoggedIn"];

    if (isPublicRoute === false && isUserLoggedIn === false) {
        const token = localStorage.getItem("token");

        guard.defaults.headers["Authorization"] = `Bearer ${token}`;

        try {
            const response = await guard.get("/user");
            await store.dispatch("user/login", await response.data.user)
            next();
        } catch (error) {
            await router.replace("/login");
            localStorage.removeItem("token");
        }
    } else {
        next();
    }
});

export default router;

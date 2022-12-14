import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/library",
    name: "library",
    component: () => import("../views/LibraryView.vue"),
  },
  {
    path: "/search",
    name: "SearchView",
    component: () => import("../views/SearchView"),
  },
  {
    path: "/album/:id",
    name: "AlbumView",
    component: () => import("../views/AlbumView"),
  },
  {
    path: "/artist/:id",
    name: "ArtistView",
    component: () => import("../views/ArtistView"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

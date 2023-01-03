import { homeRoutes } from "@/modules/home/home.routes";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
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

  ...homeRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

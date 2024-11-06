import { aboutRoutes } from "@/modules/about/about.routes";
import { homeRoutes } from "@/modules/home/home.routes";
import { libraryRoutes } from "@/modules/library/library.routes";
import { searchRoutes } from "@/modules/search/search.routes";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
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

  ...searchRoutes,
  ...homeRoutes,
  ...libraryRoutes,
  ...aboutRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

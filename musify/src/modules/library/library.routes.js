export const libraryRoutes = [
  {
    path: "/library",
    name: "library",
    component: () => import("./views/LibraryView.vue"),
  },
];

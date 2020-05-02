const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/Index.vue") }
    ]
  },
  {
    path: "/clientes",
    name: "clientes",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Clientes/Index.vue") },
      {
        path: "detallecliente/:id",
        name: "detallecliente",
        component: () => import("pages/Clientes/DetalleCliente.vue")
      },
      {
        path: "detallecronograma/:id",
        component: () => import("pages/Clientes/TablaCronograma.vue")
      }
    ]
  },
  {
    path: "/pagos",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Pagos/Index.vue") }]
  },
  {
    path: "/auth",
    component: () => import("pages/Auth/PageAuth.vue")
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;

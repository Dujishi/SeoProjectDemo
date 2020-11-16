import loadable from "@/utils/loadable";

const Index = loadable(() => import("@/views/Index"));
const Product = loadable(() => import("@/views/Product"));

const routes = [
  { path: "/index", exact: true, name: "Index", component: Index, auth: [1] },
  {
    path: "/product",
    exact: true,
    name: "Product",
    component: Product,
    auth: [1]
  }
];

export default routes;

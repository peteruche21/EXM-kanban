import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IPage } from "../types";

const pages = import.meta.glob("../pages/*.tsx", { eager: true });

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\.\/pages\/(.*)\.tsx$/)?.[1];
  const normalizeName = name?.includes("$") ? name.replace("$", ":") : name;
  const safePage = pages[path] as IPage;

  return {
    name,
    path: name === "index" ? "/" : `/${normalizeName?.toLowerCase()}`,
    component: safePage.default,
    loader: safePage.loader,
    action: safePage.action,
    ErrorBoundary: safePage.ErrorBoundary,
  };
});

const router = createBrowserRouter(
  routes.map(({ component: RouteComp, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <RouteComp />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

export const RouteProvider = () => {
  return <RouterProvider router={router} />;
};

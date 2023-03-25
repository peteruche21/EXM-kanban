import { Route, Routes } from "react-router-dom";
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
  };
});

export const RouteProvider = () => {
  return (
    <Routes>
      {routes.map(({ path, component: RouteComp }) => {
        return <Route key={path} path={path} element={<RouteComp />}></Route>;
      })}
    </Routes>
  );
};

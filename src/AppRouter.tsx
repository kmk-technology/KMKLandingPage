import React, { lazy, Suspense } from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import NotFound from "./pages/error/404";
import Home from "./pages/Home";
import Navbar from "./pages/Home/components/navbar";

const ROUTES = import.meta.glob([
  "/src/pages/projects/*/*/index.tsx",
  "/src/pages/projects/*/*/[form]/index.tsx",
  "!/src/pages/projects/Dashboard/**/index.tsx",
]);
const routesKey = Object.keys(ROUTES);
const routes = routesKey.map((route) => {
  const fileName =
    route.match(
      /\/src\/pages\/((projects\/\w*\/\w*\/\[form\])|(projects\/\w*\/\w*))|index|\.tsx$/g
    )?.[0] || "";
  const path = fileName.replace(/\[form\](.*)/, ":form/:id?");
  const component = ROUTES[route] as () => Promise<{
    default: React.ComponentType<any>;
  }>;
  return {
    path,
    component,
  };
});
const adminRoute = routes.map((route) => ({
  ...route,
  path: route.path.replace("/src/pages/projects/", ""),
}));
const maproute = adminRoute.map(({ path, component: Component }) => {
  const object = path.replace("/:form/:id?", "");
  console.log(path, object, Component);
  if (!Component) {
    return <React.Fragment key={path}></React.Fragment>;
  }
  const Page = lazy(Component);

  return (
    <Route
      key={path}
      path={path}
      element={
        <Suspense fallback={<>Đang tải trang ...</>}>
          <Page _object={object} />
        </Suspense>
      }
    />
  );
});
export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<></>} />
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route
            path="projects"
            element={
              <>
                <Outlet />
              </>
            }
          >
            <Route index element={<Navbar />} />
            {maproute}
            <Route path={"*"} element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

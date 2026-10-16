import { lazy, Suspense, type ComponentType } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import NotFound from "./pages/error/404";
import Home from "./pages/Home";

// Project pages (e.g. /projects/medcg/policy) are registered automatically from the folder structure.
const ROUTES = import.meta.glob([
  "/src/pages/projects/*/*/index.tsx",
  "/src/pages/projects/*/*/[form]/index.tsx",
  "!/src/pages/projects/Dashboard/**/index.tsx",
]);

type PageModule = { default: ComponentType<{ _object: string }> };

const projectRoutes = Object.keys(ROUTES).map((file) => {
  const fileName =
    file.match(
      /\/src\/pages\/((projects\/\w*\/\w*\/\[form\])|(projects\/\w*\/\w*))|index|\.tsx$/g,
    )?.[0] || "";
  const path = fileName
    .replace(/\[form\](.*)/, ":form/:id?")
    .replace("/src/pages/projects/", "");
  const object = path.replace("/:form/:id?", "");
  const Page = lazy(ROUTES[file] as () => Promise<PageModule>);

  return (
    <Route
      key={path}
      path={path}
      element={
        <Suspense fallback={<PageFallback />}>
          <Page _object={object} />
        </Suspense>
      }
    />
  );
});

function PageFallback() {
  return (
    <div
      className="grid min-h-[100svh] place-items-center"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm text-muted">Đang tải trang… / Loading…</span>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Outlet />}>
            <Route index element={<Navigate to="/" replace />} />
            {projectRoutes}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

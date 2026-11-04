import { lazy, Suspense, type ComponentType } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { SHOW_CAREERS } from "./components/site/pages";
import NotFound from "./pages/error/404";
import About from "./pages/about";
import Clients from "./pages/clients";
import Contact from "./pages/contact";
import Home from "./pages/Home";
import Product from "./pages/product";
import Products from "./pages/products";
import Technology from "./pages/technology";

// the site pages (menu order) ship with the app, so moving between them never waits on a load
const pages = {
  products: Products,
  product: Product,
  technology: Technology,
  clients: Clients,
  about: About,
  careers: lazy(() => import("./pages/careers")),
  contact: Contact,
};
const page = (Page: ComponentType) => (
  <Suspense fallback={<PageFallback />}>
    <Page />
  </Suspense>
);

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

/** Holds the page height while a rarely used page (legal, careers) loads; shows nothing. */
function PageFallback() {
  return <div className="min-h-[100svh] bg-white" />;
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="products" element={page(pages.products)} />
          <Route path="product/:slug" element={page(pages.product)} />
          <Route path="technology" element={page(pages.technology)} />
          <Route path="clients" element={page(pages.clients)} />
          <Route path="about" element={page(pages.about)} />
          {SHOW_CAREERS ? (
            <Route path="careers" element={page(pages.careers)} />
          ) : null}
          <Route path="contact" element={page(pages.contact)} />
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

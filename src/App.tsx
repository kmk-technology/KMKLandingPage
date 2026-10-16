import AppRouter from "./AppRouter";
import Preloader from "./components/layout/Preloader";
import LangProvider from "./i18n/LangProvider";

export default function App() {
  return (
    <LangProvider>
      <Preloader />
      <AppRouter />
    </LangProvider>
  );
}

import { BrowserRouter as Router, Routes } from "react-router-dom";
import * as pokemonsFeature from "./modules/pokemons";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ConfirmProvider } from "@App/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const client = new QueryClient();

const AppRouter = () => {
  return (
    <Router>
      <Routes>{pokemonsFeature.router}</Routes>
    </Router>
  );
};
function App() {
  return (
    <QueryClientProvider client={client}>
      <ConfirmProvider>
        <div>
          <AppRouter />
        </div>
      </ConfirmProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  );
}

export default App;

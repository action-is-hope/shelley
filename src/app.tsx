import type React from "react";
import DefaultLayout from "./layouts";
import { HelmetProvider } from "react-helmet-async";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

export interface AppProps {
  className?: string;
}

export const App: React.VFC<AppProps> = () => {
  return (
    <main>
      <HelmetProvider>
        <Router>
          <DefaultLayout>
            <Routes />
          </DefaultLayout>
        </Router>
      </HelmetProvider>
    </main>
  );
};

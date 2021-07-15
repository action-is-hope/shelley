import type React from "react";
import { st, classes } from "./app.st.css";
// import { Header } from "./header";
import DefaultLayout from "./layouts";
import { HelmetProvider } from "react-helmet-async";

import { BrowserRouter as Router, Link } from "react-router-dom";
import Routes from "./Routes";

export interface AppProps {
  className?: string;
}

export const App: React.VFC<AppProps> = ({ className }) => {
  return (
    <main className={st(classes.root, className)}>
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

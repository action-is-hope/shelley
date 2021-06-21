import type React from "react";
import { st, classes } from "./app.st.css";
// import { Header } from "./header";
import BlockquoteDocs from "./components/Blockquote/__blockquoteDocs";
import ButtonDocs from "./components/Button/__buttonDocs";

import IndexPage from "./pages/index";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export interface AppProps {
  className?: string;
}

export const App: React.VFC<AppProps> = ({ className }) => {
  return (
    <main className={st(classes.root, className)}>
      {/* <Header className={classes.header} /> */}

      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blockquote">blockquote</Link>
              </li>
              <li>
                <Link to="/button">button</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/blockquote">
              <BlockquoteDocs />
            </Route>
            <Route path="/button">
              <ButtonDocs />
            </Route>
            <Route path="/">
              <IndexPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </main>
  );
};

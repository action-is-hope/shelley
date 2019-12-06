import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";
// Global styles work with TS like this:
require("./example.css");
// import Button from "../components/Button/Button";
import { Button } from "reakit/Button";
import { useTransition, animated } from "react-spring";
import { CSSTransition } from "react-transition-group";
// import {
//   Dialog,
//   DialogOverlay,
//   DialogContent
// } from "../components/Dialog/Dialog";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";

import * as easings from "d3-ease";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import DefaultLayout from "../layouts";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema.
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const IndexPage = ({ data }: IndexPageProps) => {
  const AnimatedDialogOverlay = animated(DialogOverlay);
  const AnimatedDialogContent = animated(DialogContent);
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  // const transitions = useTransition(showDialog, null, {
  //   from: { opacity: 0, y: -10 },
  //   enter: { opacity: 1, y: 0 },
  //   leave: { opacity: 0, y: 10 }
  // });

  // const transitions = useTransition(items, item => item.id, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 }
  // });

  const transitions = useTransition(showDialog, null, {
    // from: { opacity: 0, translate: -100 },
    // enter: { opacity: 1, translate: 0 },
    // leave: { opacity: 0, translate: 100 }

    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" }
    // config: { duration: 300, easing: easings.easeCubic },
    // onDestroyed: () => console.log("Hi")
    // config: { duration: 1000 }
  });

  // const ref = React.createRef<HTMLButtonElement>();

  // const focusButton = () => {
  //   ref.current && ref.current.focus();
  // };

  return (
    <DefaultLayout>
      <div className="example">
        <h1>Hello Gatsby</h1>
        <p>
          Welcome to your new <strong>{data.site.siteMetadata.title}</strong>{" "}
          website with Typescript and Stylable support.
        </p>
        <p>Lets build something awesome... like a button perhaps?</p>
        <div>
          <Button
            className={style.override}
            onClick={() => alert("I like big buttons and I cannot lie!")}
          >
            Boom
          </Button>

          <Tabs>
            <TabList>
              <Tab>One</Tab>
              <Tab>Two</Tab>
              <Tab>Three</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>

        <button onClick={open}>Show Dialog</button>
        {/* <CSSTransition
          in={showDialog}
          timeout={300}
          unmountOnExit
          classNames="edit"
        >
          <div>
            <DialogOverlay onDismiss={close}>
              <p>
                I don’t use <code>isOpen</code>, I just render when I should and
                not when I shouldn’t.
              </p>
              <button onClick={close}>Okay</button>
            </DialogOverlay>
          </div>
        </CSSTransition> */}

        <div>
          <Button
            className={style.override}
            onClick={() => setShowDialog(true)}
          >
            Hit up dialog
          </Button>

          {transitions.map(
            ({ item, key, props: styles }) =>
              item && (
                <AnimatedDialogOverlay style={{ opacity: styles.opacity }}>
                  <AnimatedDialogContent
                    style={{
                      transform: styles && styles.transform
                      // borderRadius: 10
                    }}
                  >
                    <Button
                      className={style.override}
                      onClick={() => setShowDialog(false)}
                    >
                      Close
                    </Button>
                    <p>React Spring makes it too easy!</p>
                    <br />
                    <input type="text" />
                    <button>Ayyyyyy</button>
                  </AnimatedDialogContent>
                </AnimatedDialogOverlay>
              )
          )}
        </div>

        {/* <button onClick={() => setShowDialog(true)}>Show Dialog</button>
        <Dialog aria-label="Announcement" isOpen={showDialog} className="TEST">
          <button onClick={() => setShowDialog(false)}>Close Dialog</button>
          <p>This is killer!</p>
          <input type="text" />
          <br />
          <input type="text" />
          <button>Ayyyyyy</button>
        </Dialog> */}

        {/* <button onClick={open}>Show Dialog</button>
        <CSSTransition
          in={showDialog}
          timeout={300}
          unmountOnExit
          classNames="edit"
        >
          <div>
            <DialogOverlay onDismiss={close}>
              <p>
                I don’t use <code>isOpen</code>, I just render when I should and
                not when I shouldn’t.
              </p>
              <button onClick={close}>Okay</button>
            </DialogOverlay>
          </div>
        </CSSTransition> */}
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

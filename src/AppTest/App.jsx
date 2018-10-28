import React from "react";
import Wheel from "../components/wheel";
import { hot } from "react-hot-loader";
import "./apptest.css";

const App = () => {
  return (
    <main className={"App"}>
      <Wheel space={1} arrows={true} slidesShowing={4}>
        <div className={"wheel-pic"}>
          <a href={"https://github.com"}>
            <img
              src={`https://logo.clearbit.com/https://github.com?size=140`}
            />
          </a>
        </div>
        <div className={"wheel-pic"}>
          <a href={"https://amazon.com"}>
            <img
              src={`https://logo.clearbit.com/https://amazon.com?size=140`}
            />
          </a>
        </div>
        <div className={"wheel-pic"}>
          <a href={"https://mozilla.org"}>
            <img
              src={`https://logo.clearbit.com/https://mozilla.org?size=140`}
            />
          </a>
        </div>
        <div className={"wheel-pic"}>
          <a href={"https://webpack.js.org"}>
            <img
              src={`https://logo.clearbit.com/https://webpack.js.org?size=140`}
            />
          </a>
        </div>
        <div className={"wheel-pic"}>
          <a href={"https://hacks.mozilla.org"}>
            <img
              src={`https://logo.clearbit.com/https://hacks.mozilla.org?size=140`}
            />
          </a>
        </div>
        <div className={"wheel-pic"}>
          <a href={"https://bitbucket.com"}>
            <img
              src={`https://logo.clearbit.com/https://bitbucket.com?size=140`}
            />
          </a>
        </div>
        <div className={"wheel-pic"}>
          <a href={"https://google.com"}>
            <img
              src={`https://logo.clearbit.com/https://google.com?size=140`}
            />
          </a>
        </div>
        <div className={"wheel-pic"}>
          <a href={"https://youtube.com"}>
            <img
              src={`https://logo.clearbit.com/https://youtube.com?size=140`}
            />
          </a>
        </div>
        <div className={"wheel-pic"}>
          <a href={"https://netflix.com"}>
            <img
              src={`https://logo.clearbit.com/https://netflix.com?size=140`}
            />
          </a>
        </div>
        <div className={"wheel-pic"}>
          <a href={"https://blog.mozilla.org"}>
            <img
              src={`https://logo.clearbit.com/https://blog.mozilla.org?size=140`}
            />
          </a>
        </div>
      </Wheel>
    </main>
  );
};

export default hot(module)(App);

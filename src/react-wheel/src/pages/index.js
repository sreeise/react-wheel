import React from "react";
import Wheel from "../components/Wheel/Wheel";
import styled from "styled-components";

// TEST FILE ONLY

// Moves Wheel component into center of screen for testing.
const ContainerDark = styled.div`
  max-width: 100%;
  margin-top: 5%;
  margin-left: 0%;
  background-color: #222222;
`;

const ContainerLight = styled.div`
  max-width: 60%;
  margin-top: 5%;
  margin-left: 20%;
`;

// Test urls for images
const urls = [
  "https://github.com",
  "https://netflix.com",
  "https://bitbucket.com",
  "https;//gitlab.com",
  "https://mozilla.org",
  "https://youtube.com",
  "https://blog.mozilla.org",
  "https://amazon.com",
];

// Show Wheel carousels with available props
const IndexPage = () => (
  <div>
    <ContainerDark>
      <Wheel theme={"dark"} slidesShowing={4} spacing={40}>
        {urls.map((url, index) => {
          return (
            <a key={index} href={url}>
              <img
                style={{ width: "140px" }}
                alt={url}
                src={`https://logo.clearbit.com/${url}?size=150`}
              />
            </a>
          );
        })}
      </Wheel>
    </ContainerDark>

    <ContainerLight>
      <Wheel
        theme={"light"}
        arrowColor={"purple"}
        startSlide={1}
        slidesShowing={2}
        spacing={0}
      >
        {urls.map((url, index) => {
          return (
            <a key={index} href={url}>
              <img
                style={{ width: "140px" }}
                alt={url}
                src={`https://logo.clearbit.com/${url}?size=150`}
              />
            </a>
          );
        })}
      </Wheel>
    </ContainerLight>

    <ContainerDark>
      <Wheel
        theme={"dark"}
        slidesShowing={3}
        spacing={40}
        enterDuration={800}
        leaveDuration={400}
      >
        {urls.map((url, index) => {
          return (
            <a key={index} href={url}>
              <img
                style={{ width: "140px" }}
                alt={url}
                src={`https://logo.clearbit.com/${url}?size=150`}
              />
            </a>
          );
        })}
      </Wheel>
    </ContainerDark>
  </div>
);

export default IndexPage;

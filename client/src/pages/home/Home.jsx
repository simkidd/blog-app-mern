import React from "react";
import Articles from "./containers/Articles";
import Hero from "./containers/Hero";
import Cta from "./containers/Cta";

const Home = () => {
  return (
    <>
      <Hero />
      <Articles />
      <Cta />
    </>
  );
};

export default Home;

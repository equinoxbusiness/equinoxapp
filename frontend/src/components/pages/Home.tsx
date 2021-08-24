import React from "react";
import GeneralNav from "./GeneralNav";
import ToggleButton from "../ToggleButton/index";
import CardContainer from "../CardContainer/index";
import Footer from "../Footer/index";

export const Home = (props: any) => {
  return (
    <div className="main-container-home">
      <GeneralNav />
      <CardContainer />
      <Footer />
    </div>
  );
};

export default Home;


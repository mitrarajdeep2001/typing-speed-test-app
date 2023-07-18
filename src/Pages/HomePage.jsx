import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import TypingBox from "../Components/TypingBox";
import UpperMenu from "../Components/UpperMenu";

const HomePage = () => {
  return (
    <div className="canvas">
      <div>
        <Header />
      </div>
      <div>
        <UpperMenu />
        <TypingBox />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

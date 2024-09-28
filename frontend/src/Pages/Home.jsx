import React from "react";
import CategoryList from "../Components/CategoryList";
import BannerProduct from "../Components/BannerProduct";
import HorizontalCardProduct from "../Components/HorizontalCardProduct";
import VerticalCardProduct from "../Components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
      <VerticalCardProduct category={"desktops"} heading={"Popular's Desktops"}/>
      
    </div>
  );
};

export default Home;

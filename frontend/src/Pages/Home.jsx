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
      <VerticalCardProduct category={"mobiles"} heading={"Top's Mobiles"} />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Watches"}
      />
      <VerticalCardProduct category={"laptops"} heading={"Popular's laptops"} />
      <HorizontalCardProduct category={"camera"} heading={"Top's Camera"} />
      <VerticalCardProduct category={"mobile cover"} heading={"Mobile Cover"} />
      <HorizontalCardProduct
        category={"smartwatch"}
        heading={"Popular's Smartwatch"}
      />
      <VerticalCardProduct
        category={"desktops"}
        heading={"Popular's Desktops"}
      />
      <HorizontalCardProduct category={"earBuds"} heading={"Top's EarBuds"} />
      <VerticalCardProduct
        category={"screen protectors"}
        heading={"Screen Protectors"}
      />
      <HorizontalCardProduct
        category={"earphones"}
        heading={"Popular's Earphones"}
      />
      <VerticalCardProduct category={"tablets"} heading={"Top's Tablets"} />
      <HorizontalCardProduct
        category={"drives storage"}
        heading={"Drives Storage"}
      />
      <VerticalCardProduct
        category={"televisions"}
        heading={"Popular's Televisions"}
      />
      <VerticalCardProduct
        category={"air conditioners"}
        heading={"Air Conditioners"}
      />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"speakers"} heading={"Speakers"} />
      <VerticalCardProduct
        category={"washing machines"}
        heading={"Washing Machines"}
      />
    </div>
  );
};

export default Home;

import React from "react";
import Link from "next/link";
import LeftSidebar from "@/components/LeftSidebar";
import MainComopnent from "@/components/MainComopnent";
import RightSection from "@/components/RightSection";

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center text-white relative bg-black">
      <div className="max-w-[70vw] w-full h-full flex relative">
        {/* LEFT NAVBAR*/}
        <LeftSidebar />
        <MainComopnent />
        <RightSection />
      </div>
    </div>
  );
};

export default Home;

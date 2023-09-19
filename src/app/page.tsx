import React from "react";
import Link from "next/link";
import LeftSidebar from "@/components/LeftSidebar";
import MainComopnent from "@/components/MainComopnent";
import { BsSearch } from "react-icons/bs";
const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-screen-xl w-full h-full flex relative">
        {/* LEFT NAVBAR*/}
        <LeftSidebar />
        <MainComopnent />
        <section className="fixed flex flex-col space-y-4 right-0">
          <div>
            <div className="relative w-full h-full">
              <label className="absolute top-0 left-0 h-full flex items-center justify-center">
                <BsSearch className="w-5 h-5 text-gray-500" />
              </label>
              <input
                id="SearchBox"
                type="text"
                placeholder="Search Twiiter"
                className="outline-none bg-transparent border-none w-full h-full rounded-xl py-4 px-8"
              />
            </div>
          </div>
          <div></div>
          <div></div>
        </section>
      </div>
    </div>
  );
};

export default Home;

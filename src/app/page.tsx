import React from "react";
import Link from "next/link";
import LeftSidebar from "@/components/LeftSidebar";
import MainComopnent from "@/components/MainComopnent";
import { BsSearch } from "react-icons/bs";
const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-[70vw] w-full h-full flex relative">
        {/* LEFT NAVBAR*/}
        <LeftSidebar />
        <MainComopnent />
        <section className="w-full sticky top-2 overflow-scroll no-scrollbar mt-2 flex flex-col items-stretch h-screen px-6">
          <div>
            <div className="relative w-full h-full group">
              <input
                id="SearchBox"
                type="text"
                placeholder="Search Twitter"
                className="outline-none peer focus:border-primary focus:border bg-neutral-900/90 w-full h-full rounded-full py-4 pl-14 pr-4"
              />
              <label
                htmlFor="serachBox"
                className="absolute top-0 left-0 h-full flex items-center justify-center p-4 text-gray-500
                 peer-focus:text-primary"
              >
                <BsSearch className="w-5 h-5" />
              </label>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
            <h3 className="font-bold text-xl my-4 px-4 ">What Is Going On</h3>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="hover:bg-white/10 last:rounded-b-xl p-4 transition duration-100"
                >
                  <div className="font-bold text-lg">#trending{i + 1}</div>
                  <div className="text-xs text-neutral-400"> 35.4k</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
            <h3 className="font-bold text-xl my-4 px-4 ">Who To Follow</h3>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="hover:bg-white/10 last:rounded-b-xl p-4 transition duration-100"
                >
                  <div className="font-bold text-lg">#trending{i + 1}</div>
                  <div className="text-xs text-neutral-400"> 35.4k</div>
                </div>
              ))}
            </div>
          </div>
          <div></div>
        </section>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import Link from "next/link";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsThreeDots } from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
import { PiHamburger } from "react-icons/pi";
import { getTweets } from "@/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Navigation_Items = [
  {
    title: "Hamburger News",
    icon: PiHamburger,
  },
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: HiOutlineHashtag,
  },
  {
    title: "Notifications",
    icon: BsBell,
  },
  {
    title: "Messages",
    icon: HiEnvelope,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
  },
  {
    title: "Profile",
    icon: BiUser,
  },
];

const LeftSidebar = async () => {
  const res = await getTweets();
  const supabaseClient = createServerComponentClient({
    cookies,
  });

  const { data: userData, error: userError } =
    await supabaseClient.auth.getUser();

  return (
    <section className="w-[23%] xl:flex hidden flex-col h-screen items-stretch sticky top-0">
      <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
        {Navigation_Items.map((item) => (
          <Link
            className="hover:bg-white/10 text-2xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6"
            href={`/${item.title.toLowerCase()}`}
            key={item.title}
          >
            <div>
              <item.icon />
            </div>
            {item.title !== "Hamburger News" && <div>{item.title}</div>}
          </Link>
        ))}
        <button className="rounded-full bg-primary m-4 p-4 text2xl text-center hover:bg-opacity-70 transition duration-200">
          Tweet
        </button>
      </div>
      <button
        className="rounded-full flex items-center space-x-2 bg-transparent p-4 text-center hover:bg-white/10 
          transition duration-200 w-full justify-between"
      >
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-slate-400 w-10 h-10"></div>
          <div className="text-left text-sm">
            <div className="font-semibold">Club of Coders</div>
            <div className="">@clubofcoders</div>
          </div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </button>
    </section>
  );
};

export default LeftSidebar;

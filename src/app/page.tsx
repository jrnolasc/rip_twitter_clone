import React from "react";
import Link from "next/link";
import LeftSidebar from "@/components/left-sidebar";
import MainComopnent from "@/components/main-component";
import RightSection from "@/components/right-sidebar";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase.types";

const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data, error } = await supabase.auth.getUser();

  console.log({ data, error });

  return (
    <div className="w-full h-full flex justify-center items-center text-white relative bg-black">
      <div className="xl:max-w-[70vw] w-full h-full flex relative">
        <LeftSidebar />
        <MainComopnent />
        <RightSection />
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getTweets } from "@/lib/supabase/queries";

import ComposeTweet from "./server-components/compose-tweets";
import Tweet from "./client-component/tweet";

dayjs.extend(relativeTime);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

//grab tweets and profile info from database

const MainComopnent = async () => {
  const res = await getTweets();
  const supabaseClient = createServerComponentClient({
    cookies,
  });

  const { data: userData, error: userError } =
    await supabaseClient.auth.getUser();
  return (
    <main
      className="flex xl:w-[50%] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px]
border-gray-600"
    >
      <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
        Home
      </h1>
      <div
        className="border-t-[.5px] px-4 py-6 border-b-[.5px] border-gray-600
  relative flex items-stretch space-x-2"
      >
        <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div>
        <ComposeTweet />
      </div>
      <div className="flex flex-col w-full">
        {res?.error && <div>Server Error </div>}
        {res?.data &&
          res.data.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweet={tweet}
              currentUserId={userData.user?.id}
            />
          ))}
      </div>
    </main>
  );
};

export default MainComopnent;

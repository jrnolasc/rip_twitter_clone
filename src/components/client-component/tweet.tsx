"use server";

import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoStatsChart, IoShareOutline } from "react-icons/io5";
import { TweetType, getLikesCount, isLiked } from "@/lib/supabase/queries";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import LikeButton from "./like-button";

dayjs.extend(relativeTime);

type TweetProps = {
  tweet: TweetType;
  currentUserId?: string;
};

const Tweet = async ({ tweet, currentUserId }: TweetProps) => {
  const getTweetLikesCount = await getLikesCount(tweet.id);
  const userHasLiked = await isLiked({
    tweetId: tweet.id,
    userId: currentUserId,
  });

  return (
    <div
      key={tweet.id}
      className="border-t-[0.5px] border-gray-600 p-2  flex space-x-4 "
    >
      <div>
        <div className="w-10 h-10 bg-slate-200 rounded-full " />
      </div>
      <div className="flex flex-col">
        <div className="flex item-center w-full justify-between">
          <div className="flex items-center space-x-1 w-full">
            <div className="font-bold">{tweet.profiles.full_name ?? ""}</div>
            <div className="text-gray-500">@{tweet.profiles.username}</div>
            <div className="text-gray-500">
              <BsDot />
            </div>
            <div className="text-gray-500">
              {dayjs(tweet.created_at).fromNow()}
            </div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
        <div className="text-white text-base">{tweet.text}</div>
        <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2"></div>
        <div className="flex items-center justify-start space-x-20 mt-2 w-full">
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <BsChat />
          </div>
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <AiOutlineRetweet />
          </div>
          <LikeButton
            tweetId={tweet.id}
            likesCount={getTweetLikesCount.count}
            userHasLiked={userHasLiked}
          />
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <IoStatsChart />
          </div>
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <IoShareOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;

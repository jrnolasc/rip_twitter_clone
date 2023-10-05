"use client";

import React, { useState, useTransition } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { likeTweet, unlikeTweet } from "@/lib/supabase/mutation";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

type LikeButtonProps = {
  tweetId: string;
  likesCount: number | null;
  userHasLiked: boolean;
};

const LikeButton = ({ tweetId, likesCount, userHasLiked }: LikeButtonProps) => {
  const [supabase] = useState(() => createPagesBrowserClient());
  let [isLikePending, startTransition] = useTransition();

  return (
    <button
      disabled={isLikePending}
      onClick={() => {
        supabase.auth
          .getUser()
          .then((res) => {
            if (res.data && res.data.user) {
              const user = res.data.user;
              startTransition(() =>
                userHasLiked
                  ? unlikeTweet({
                      tweetId,
                      userId: user.id,
                    })
                  : likeTweet({
                      tweetId,
                      userId: user.id,
                    })
              );
            } else {
              toast("please login");
            }
          })
          .catch(() => {
            toast.error("authentication failed");
          });
      }}
      className="rounded-full flex items-center space-x-2 hover:bg-white/10 transition duration-200 p-3 cursor-pointer"
    >
      {userHasLiked ? (
        <AiFillHeart className="w-5 h-5 text-red-600" />
      ) : (
        <AiOutlineHeart className="w-5 h-5" />
      )}

      <span>{likesCount ?? 0}</span>
    </button>
  );
};

export default LikeButton;

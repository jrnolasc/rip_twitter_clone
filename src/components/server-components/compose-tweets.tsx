import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { randomUUID } from "crypto";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import ComposeTweetForm from "../client-component/compose-tweet-form";

const ComposeTweets = () => {
  async function submitTweet(formData: FormData) {
    "use server";

    const tweet = formData.get("tweet");

    if (!tweet) return;

    const supabaseClient = createServerComponentClient({
      cookies,
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseSecretKey)
      return {
        error: { message: "supabase credentials are not provided!" } as any,
      };

    const supabaseServer = new SupabaseClient(supabaseUrl, supabaseSecretKey);

    //// pass in tweets////
    const { data: userData, error: userError } =
      await supabaseClient.auth.getUser();
    if (userError) return;

    const { data, error } = await supabaseServer.from("tweets").insert({
      user_id: userData.user.id,
      text: tweet.toString(),
      id: randomUUID(),
    });

    revalidatePath("/");

    return { data, error };
  }

  return <ComposeTweetForm serverAction={submitTweet} />;
};

export default ComposeTweets;

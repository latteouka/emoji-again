import { type NextPage } from "next";
import Image from "next/image";

import { api } from "@/utils/api";
import { SignInButton, useUser } from "@clerk/nextjs";
import LoadingPage, { LoadingSpinner } from "@/components/Loading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "@/components/Layout";
import PostView from "@/components/PostView";

const CreatePostWizard = () => {
  const [input, setInput] = useState("");
  const { user } = useUser();

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      // update after posting
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post!");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full items-center gap-3">
      <Image
        width={56}
        height={56}
        className="rounded-full"
        src={user.profileImageUrl}
        alt="profile image"
      />
      <input
        type="text"
        className="grow border-none bg-transparent outline-none"
        placeholder="Type some emojis!"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        value={input}
        disabled={isPosting}
      />
      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ content: input })} disabled={isPosting}>
          Post
        </button>
      )}
      {isPosting && (
        <div className="flex h-full justify-items-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postLoading } = api.posts.getAll.useQuery();

  if (postLoading)
    return (
      <div className="">
        <LoadingPage />
      </div>
    );
  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col overflow-y-scroll">
      {data?.map((fullPost) => {
        return <PostView {...fullPost} key={fullPost.post.id} />;
      })}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // start fetching asap
  api.posts.getAll.useQuery();

  // return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  return (
    <Layout>
      <div className="flex border-b border-slate-400 p-4">
        {!isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}

        {isSignedIn && <CreatePostWizard />}
      </div>

      <Feed />
    </Layout>
  );
};

export default Home;

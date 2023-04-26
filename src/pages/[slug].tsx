import type { GetStaticPropsContext } from "next";

import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import PostView from "@/components/PostView";

import { api } from "@/utils/api";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  return (
    <div className="flex flex-col overflow-y-scroll">
      {data?.map((fullPost) => {
        return <PostView {...fullPost} key={fullPost.post.id} />;
      })}
    </div>
  );
};

const Profile: NextPage<{ id: string }> = ({ id }) => {
  // start fetching asap
  const { data: user } = api.profile.getUserById.useQuery({
    id,
  });

  // return empty div if user isn't loaded
  if (!user) return <div>404</div>;

  return (
    <>
      <Head>
        <title>@{user.username}</title>
      </Head>
      <Layout>
        <div className="relative h-48 bg-slate-400">
          <Image
            src={user.profileImageUrl}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black"
            alt={`${user.id ?? ""}'s profile picture`}
          />
        </div>
        <div className="h-48"></div>
        <div className="p-4 text-xl font-bold">{`@${user.id ?? ""}`}</div>
        <div className="w-full border-b border-slate-400"></div>
        <ProfileFeed userId={user.id} />
      </Layout>
    </>
  );
};

export default Profile;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  await ssg.profile.getUserById.prefetch({ id: slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id: slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

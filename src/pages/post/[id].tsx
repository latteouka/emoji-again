import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { api } from "@/utils/api";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";
import PostView from "@/components/PostView";
import Layout from "@/components/Layout";

const Post: NextPage<{ id: string }> = ({ id }) => {
  // start fetching asap
  const { data } = api.posts.getById.useQuery({
    id,
  });

  // return empty div if user isn't loaded
  if (!data) return <div>404</div>;

  return (
    <Layout>
      <PostView {...data} />
    </Layout>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("no id");
  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

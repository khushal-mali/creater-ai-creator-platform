"use client";
import PostEditor from "@/components/Dashboard/post-editor";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RingLoader } from "react-spinners";

const CreatePost = () => {
  const { data: existingDraft, isLoading: isDraftLoading } = useConvexQuery(
    api.posts.getUserDraft,
  );
  const { data: currentUser, isLoading: userLoading } = useConvexQuery(
    api.users.getCurrentuser,
  );

  if (isDraftLoading || userLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <RingLoader className="size-10" color="#D8B4FE" />
      </div>
    );
  }

  if (!currentUser?.username) {
    return (
      <div className="flex h-80 items-center justify-center bg-slate-900 p-8">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <h1 className="text-3xl font-bold text-white">Username Required</h1>
          <p className="text-lg text-slate-400">
            Set up a username to create and share your posts
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard/settings">
              <Button variant="primary">
                Set Up Username
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <PostEditor initialData={existingDraft} mode={"create"} />;
};

export default CreatePost;

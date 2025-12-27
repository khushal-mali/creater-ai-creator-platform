"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { TrendingUp, UserPlus, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import PostCard from "@/components/Dashboard/post-card";

const FeedPage = () => {
  const { user: currentUser } = useUser();
  const [activeTab, setActiveTab] = useState("feed"); // "feed" or "trending"

  // Infinite scroll detection
  const { ref: loadMoreRef } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Data queries
  const { data: feedData, isLoading: feedLoading } = useConvexQuery(
    api.feed.getFeed,
    { limit: 15 },
  );

  const { data: suggestedUsers, isLoading: suggestionsLoading } =
    useConvexQuery(api.feed.getSuggestedUsers, { limit: 6 });

  const { data: trendingPosts, isLoading: trendingLoading } = useConvexQuery(
    api.feed.getTrendingPosts,
    { limit: 15 },
  );

  // Mutations
  const toggleFollow = useConvexMutation(api.follows.toggleFollow);

  // Handle follow/unfollow
  const handleFollowToggle = async (userId) => {
    if (!currentUser) {
      toast.error("Please sign in to follow users");
      return;
    }

    try {
      await toggleFollow.mutate({ followingId: userId });
      toast.success("Follow status updated");
    } catch (error) {
      toast.error(error.message || "Failed to update follow status");
    }
  };

  // Get current posts based on active tab
  const getCurrentPosts = () => {
    switch (activeTab) {
      case "trending":
        return trendingPosts || [];
      default:
        return feedData?.posts || [];
    }
  };

  const isLoading =
    feedLoading || (activeTab === "trending" && trendingLoading);
  const currentPosts = getCurrentPosts();

  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-5 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Feed Header */}
        <div className="mb-10 text-center">
          <h1 className="gradient-text-primary pb-2 text-5xl font-bold">
            Discover Amazing Content
          </h1>
          <p className="text-slate-400">
            Stay up to date with the latest posts from creators you follow
          </p>
        </div>

        {/* Main Feed */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
          <div className="space-y-6 lg:col-span-4">
            {/* Feed Tabs */}
            <div className="flex space-x-2">
              <Button
                onClick={() => setActiveTab("feed")}
                variant={activeTab === "feed" ? "primary" : "ghost"}
                className="flex-1"
              >
                For You
              </Button>
              <Button
                onClick={() => setActiveTab("trending")}
                variant={activeTab === "trending" ? "primary" : "ghost"}
                className="flex-1"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </Button>
            </div>

            {/* Create Post Prompt */}
            {currentUser && (
              <Link
                href="/dashboard/create"
                className="flex cursor-pointer items-center space-x-3"
              >
                <div className="relative h-10 w-10">
                  {currentUser.imageUrl ? (
                    <Image
                      src={currentUser.imageUrl}
                      alt={currentUser.firstName || "User"}
                      fill
                      className="rounded-full object-cover"
                      sizes="40px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-purple-600 to-blue-600 text-sm font-bold">
                      {(currentUser.firstName || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="rounded-full border border-slate-600 bg-slate-800 px-4 py-3 text-slate-400 transition-colors hover:border-slate-500">
                    What&apos;s on your mind? Share your thoughts...
                  </div>
                </div>
              </Link>
            )}

            {/* Posts Feed */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="text-center">
                  <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-purple-400" />
                  <p className="text-slate-400">Loading posts...</p>
                </div>
              </div>
            ) : currentPosts.length === 0 ? (
              <Card className="card-glass">
                <CardContent className="py-12 text-center">
                  <div className="space-y-4">
                    <div className="text-6xl">📝</div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-white">
                        {activeTab === "trending"
                          ? "No trending posts right now"
                          : "No posts to show"}
                      </h3>
                      <p className="mb-6 text-slate-400">
                        {activeTab === "trending"
                          ? "Check back later for trending content"
                          : "Follow some creators to see their posts here"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Posts Grid */}
                <div className="space-y-6">
                  {currentPosts.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      showActions={false}
                      showAuthor={true}
                      className="max-w-none"
                    />
                  ))}
                </div>

                {/* Load More Indicator */}
                {activeTab === "feed" && feedData?.hasMore && (
                  <div ref={loadMoreRef} className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Left Sidebar - Following */}
          <div className="mt-14 space-y-6 lg:col-span-2">
            {/* Suggested Users */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Suggested Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                {suggestionsLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                  </div>
                ) : !suggestedUsers || suggestedUsers.length === 0 ? (
                  <div className="py-4 text-center">
                    <p className="text-sm text-slate-400">
                      No suggestions available
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {suggestedUsers.map((user) => (
                      <div key={user._id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Link href={`/${user.username}`}>
                            <div className="flex cursor-pointer items-center space-x-3">
                              <div className="relative h-10 w-10">
                                {user.imageUrl ? (
                                  <Image
                                    src={user.imageUrl}
                                    alt={user.name}
                                    fill
                                    className="rounded-full object-cover"
                                    sizes="40px"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-purple-600 to-blue-600 text-sm font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">
                                  {user.name}
                                </p>
                                <p className="text-xs text-slate-400">
                                  @{user.username}
                                </p>
                              </div>
                            </div>
                          </Link>
                          <Button
                            onClick={() => handleFollowToggle(user._id)}
                            variant="outline"
                            size="sm"
                            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                          >
                            <UserPlus className="mr-1 h-3 w-3" />
                            Follow
                          </Button>
                        </div>
                        <div className="pl-13 text-xs text-slate-500">
                          {user.followerCount} followers • {user.postCount}{" "}
                          posts
                        </div>
                        {user.recentPosts && user.recentPosts.length > 0 && (
                          <div className="pl-13 text-xs text-slate-400">
                            Latest: &quot;
                            {user.recentPosts[0].title.substring(0, 30)}
                            ...&quot;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;

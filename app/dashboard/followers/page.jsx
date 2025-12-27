"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserCard } from "./_components/user-card";

const FollowersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Data fetching
  const { data: followers, isLoading: followersLoading } = useConvexQuery(
    api.follows.getMyFollowers,
    { limit: 100 },
  );

  const { data: following, isLoading: followingLoading } = useConvexQuery(
    api.follows.getMyFollowing,
    { limit: 100 },
  );

  // Mutations
  const { mutate: toggleFollow, isLoading: isToggling } = useConvexMutation(
    api.follows.toggleFollow,
  );

  // Handle follow/unfollow
  const handleFollowToggle = async (userId) => {
    try {
      await toggleFollow({ followingId: userId });
    } catch (error) {
      toast.error(error.message || "Failed to update follow status");
    }
  };

  // Filter users based on search
  const filterUsers = (users) => {
    if (!searchQuery.trim()) return users || [];

    return (users || []).filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const filteredFollowers = filterUsers(followers);
  const filteredFollowing = filterUsers(following);

  const isLoading = followersLoading || followingLoading;

  return (
    <div className="space-y-6 p-4 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="gradient-text-primary text-3xl font-bold">
          Followers & Following
        </h1>
        <p className="mt-2 text-slate-400">
          Manage your connections and discover new creators
        </p>
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="border-slate-600 bg-slate-800 pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="followers">
        <TabsList className="grid w-full grid-cols-2 bg-slate-900">
          <TabsTrigger value="followers">
            Followers ({filteredFollowers.length})
          </TabsTrigger>
          <TabsTrigger value="following">
            Following ({filteredFollowing.length})
          </TabsTrigger>
        </TabsList>

        {/* Followers Tab */}
        <TabsContent value="followers" className="mt-6">
          {filteredFollowers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              variant="follower"
              isLoading={isToggling}
              onToggle={handleFollowToggle}
            />
          ))}
        </TabsContent>

        {/* Following Tab */}
        <TabsContent value="following" className="mt-6">
          {filteredFollowing.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              variant="following"
              isLoading={isToggling}
              onToggle={handleFollowToggle}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FollowersPage;

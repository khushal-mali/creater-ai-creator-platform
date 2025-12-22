"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { Loader2, User } from "lucide-react";
import { useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";

const Settings = () => {
  const { data: currentUser, isLoading } = useConvexQuery(
    api.users.getCurrentuser,
  );
  const { isLoading: isSubmitting, mutate: updateUsername } = useConvexMutation(
    api.users.updateUsername,
  );
  const [username, setUsername] = useState();

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <RingLoader className="size-10" color="#D8B4FE" />
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username?.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    if (currentUser?.username === username) {
      toast.warning("You already have this username.");
      return;
    }

    await updateUsername({ username: username.trim() });
    toast.success("Username updated successfully");
  }

  return (
    <div className="space-y-8 p-4 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="gradient-text-primary text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-slate-400">
          Manage your profile and account preferences
        </p>
      </div>

      {/* Username Settings */}
      <Card className="card-glass max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <User className="mr-2 h-5 w-5" />
            Username Settings
          </CardTitle>
          <CardDescription>
            Set your unique username for your public profile
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username" className={"text-white"}>
                Username
              </Label>
              <Input
                id="username"
                value={username}
                placeholder={"Enter your username"}
                onChange={(e) => setUsername(e.target.value)}
                className={"border-slate-600 bg-slate-800 text-white"}
              />

              {currentUser?.username && (
                <div className="text-sm text-slate-400">
                  Current username:{" "}
                  <span className="text-white">@{currentUser.username}</span>
                </div>
              )}

              {/* Username Help */}
              <div className="text-xs text-slate-500">
                3-20 characters, letters, numbers, underscores, and hyphens only
              </div>

              {/* {errors.username && (
                <p className="flex items-center text-sm text-red-400">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.username.message}
                </p>
              )} */}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="w-full cursor-pointer sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Username"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

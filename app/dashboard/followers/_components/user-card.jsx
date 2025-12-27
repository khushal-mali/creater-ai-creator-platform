import { Button } from "@/components/ui/button";
import { Loader2, UserMinus, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const UserCard = ({
  user,
  isLoading = false,
  variant = "follower",
  onToggle,
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-800/30 p-3">
      {/* Avatar + Info */}
      <div className="flex items-center space-x-3">
        <Link href={`/${user.username}`}>
          <div className="relative h-10 w-10 cursor-pointer">
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
        </Link>
        <Link href={user.username ? `/${user.username}` : ""}>
          <div className="cursor-pointer">
            <p className="font-medium text-white hover:text-purple-300">
              {user.name}
            </p>
            {user.username && (
              <p className="text-sm text-slate-400">@{user.username}</p>
            )}
          </div>
        </Link>
      </div>

      {/* Action Button */}
      {variant === "follower" ? (
        !user.followsBack && (
          <Button
            onClick={() => onToggle(user._id)}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <UserPlus className="mr-1 h-4 w-4" />
                Follow Back
              </>
            )}
          </Button>
        )
      ) : (
        <Button
          onClick={() => onToggle(user._id)}
          disabled={isLoading}
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-red-400"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <UserMinus className="mr-1 h-4 w-4" />
              Unfollow
            </>
          )}
        </Button>
      )}
    </div>
  );
};

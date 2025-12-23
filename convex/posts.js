import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get user's draft (there should be one)
export const getUserDraft = query({
  handler: async (ctx) => {
    const user = await ctx.runQuery(internal.users.getCurrentuser);

    const draft = await ctx.db
      .query("posts")
      .filter((q) =>
        q.and(
          q.eq(q.field("authorId"), user._id),
          q.eq(q.field("status"), "draft"),
        ),
      )
      .unique();

    return draft;
  },
});

// Create new post
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    status: v.union(v.literal("draft"), v.literal("published")),
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    scheduledFor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getCurrentuser);

    // Check for existing draft
    const existingDraft = await ctx.db
      .query("posts")
      .filter((q) =>
        q.and(
          q.eq(q.field("authorId"), user._id),
          q.eq(q.field("status"), "draft"),
        ),
      )
      .unique();

    const now = Date.now();

    // If publishing and we have an existing draft, update it to published
    if (args.status === "published" && existingDraft) {
      await ctx.db.patch(existingDraft._id, {
        title: args.title,
        content: args.content,
        status: "published",
        tags: args.tags || [],
        category: args.category,
        featuredImage: args.featuredImage,
        updatedAt: now,
        publishedAt: now,
        scheduleFor: args.scheduledFor,
      });
      return existingDraft._id;
    }

    // If creating a draft and we have an existing draft, update it
    if (args.status === "draft" && existingDraft) {
      await ctx.db.patch(existingDraft._id, {
        title: args.title,
        content: args.content,
        tags: args.tags || [],
        category: args.category,
        featuredImage: args.featuredImage,
        updatedAt: now,
        scheduledFor: args.scheduledFor,
      });
      return existingDraft._id;
    }

    // Create new post (either first draft or direct publish)
    const postId = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      status: args.status,
      authorId: user._id,
      tags: args.tags || [],
      category: args.category,
      featuredImage: args.featuredImage,
      createdAt: now,
      updatedAt: now,
      publishedAt: args.status === "published" ? now : undefined,
      scheduledFor: args.scheduledFor,
      viewCount: 0,
      likeCount: 0,
    });

    return postId;
  },
});

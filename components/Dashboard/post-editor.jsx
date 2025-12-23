"use client";
import { api } from "@/convex/_generated/api";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import PostEditorHeader from "./post-editor-header";
import PostEditorContent from "./post-editor-content";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(1, "Content is required"),
  category: z.string().optional(),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed"),
  featuredImage: z.string().optional(),
  scheduledFor: z.string().optional(),
});

const PostEditor = ({ initialData = null, mode = "create" }) => {
  const [isSettigsOpen, setIsSettingsOpen] = useState(false);
  const [isImageModelOpen, setIsImageModelOpen] = useState(false);
  const [imageModelType, setImageModelType] = useState("featured");
  const [quillRef, setQuillRef] = useState(null);

  const router = useRouter();

  const { mutate: createPost, isLoading: isCreateLoading } = useConvexMutation(
    api.posts.update,
  );
  const { mutate: updatePost, isLoading: isUpdating } = useConvexMutation(
    api.posts.create,
  );

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      category: initialData?.category || "",
      tags: initialData?.tags || [],
      featuredImage: initialData?.featuredImage || "",
      scheduledFor: initialData?.scheduledFor
        ? new Date(initialData.scheduledFor).toISOString().slice(0, 16)
        : "",
    },
  });

  const handleSave = () => {};
  const handlePublish = () => {};
  const handleSchedule = () => {};

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <PostEditorHeader
        mode={mode}
        initialData={initialData}
        isPublishing={isUpdating || isCreateLoading}
        onSave={handleSave}
        onSettingsOpen={() => setIsSettingsOpen((prev) => !prev)}
        onPublish={handlePublish}
        onSchedule={handleSchedule}
        onBack={() => router.push("/dashboard")}
      />

      <PostEditorContent
        form={form}
        setQuillRef={setQuillRef}
        onImageUpload={(type) => {
          setImageModelType(type);
          isImageModelOpen(true);
        }}
      />
    </div>
  );
};

export default PostEditor;

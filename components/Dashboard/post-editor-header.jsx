import React, { useState } from "react";
import { Badge } from "../ui/badge";
import {
  ArrowLeft,
  Calendar,
  Loader2,
  Save,
  Send,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const PostEditorHeader = ({
  mode,
  initialData,
  isPublishing,
  onSave,
  onPublish,
  onSchedule,
  onSettingsOpen,
  onBack,
}) => {
  const [isPublishMenuOpen, setIsPublishMenuOpen] = useState(false);
  const isDraft = initialData?.status === "draft";
  const isEdit = mode === "edit";

  return (
    <header className="sticky top-0 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {isDraft && (
            <Badge
              variant="secondary"
              className="border-orange-500/30 bg-orange-500/20 text-orange-300"
            >
              Draft
            </Badge>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettingsOpen}
            className="text-slate-400 hover:text-white"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {!isEdit && (
            <Button
              onClick={onSave}
              disabled={isPublishing}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white"
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
            </Button>
          )}

          {isEdit ? (
            <Button
              variant={"primary"}
              disabled={isPublishing}
              onClick={() => {
                onPublish();
                setIsPublishMenuOpen(false);
              }}
            >
              {isPublishing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Update
            </Button>
          ) : (
            <DropdownMenu
              open={isPublishMenuOpen}
              onOpenChange={setIsPublishMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button variant={"primary"} disabled={isPublishing}>
                  {isPublishing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Publish
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => {
                    onPublish();
                    setIsPublishMenuOpen(false);
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Publish now
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onSchedule();
                    setIsPublishMenuOpen(false);
                  }}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule for later
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default PostEditorHeader;

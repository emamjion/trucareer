"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userInfo: any;
}

export default function ProfileDialog({
  open,
  onOpenChange,
  userInfo,
}: ProfileDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
      });
      setPreviewImage(userInfo?.profileImg || null);
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const payload = new FormData();
      payload.append("name", formData.name);

      if (selectedFile) {
        payload.append("profileImg", selectedFile);
      }

      // 🔥 future backend call
      // await updateProfile(payload);

      toast.success("Profile updated successfully");
      setIsEditing(false);
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            View and manage your profile information
          </DialogDescription>
        </DialogHeader>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={previewImage || "/placeholder.svg?height=80&width=80"}
            />
            <AvatarFallback>{formData.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>

          {/* Change Picture */}
          {isEditing && (
            <>
              <Label
                htmlFor="profileImg"
                className="cursor-pointer text-sm text-primary hover:underline"
              >
                Change profile picture
              </Label>
              <Input
                id="profileImg"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </>
          )}
        </div>

        {/* Form */}
        <div className="space-y-4 mt-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input value={formData.email} disabled />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          {!isEditing ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setSelectedFile(null);
                  setPreviewImage(userInfo?.profileImg || null);
                  setFormData({
                    name: userInfo?.name || "",
                    email: userInfo?.email || "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

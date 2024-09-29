"use client";

import Avatar from "@/components/shared/avatar";
import { updateUserAvatar } from "@/prisma/user";
import { uploadFormDataToCloudinary } from "@/vendor/cloudinary";
import { useSession } from "next-auth/react";
import { ChangeEvent, useRef } from "react";

export default function AvatarInput() {
  const { data, update } = useSession();
  const user = data?.user;

  const inputRef = useRef<null | any>(null);

  if (!user) return;

  async function handleChange(changeEvent: ChangeEvent<HTMLInputElement>) {
    const file = changeEvent.target.files?.[0];
    if (!file) return;

    const response = await uploadFormDataToCloudinary(file);
    const updatedUser = await updateUserAvatar(
      {
        imageUrl: response.url,
        publicId: response.public_id,
      },
      user?.id as string
    );

    await update({
      user: {
        imageUrl: updatedUser.imageUrl,
        publicId: updatedUser.publicId,
      },
    });
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      className="relative h-[80px] w-[80px] min-w-[80px] cursor-pointer overflow-hidden rounded-full [&>div.absolute]:hover:opacity-40"
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-background opacity-0 duration-300"></div>
      <Avatar imageUrl={user?.imageUrl} />
      <input
        className="!hidden"
        ref={inputRef}
        onChange={handleChange}
        type="file"
        accept="image/*"
      />
    </div>
  );
}

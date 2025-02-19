import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="mb-3 flex items-center rounded bg-white p-4 shadow dark:bg-dark-tertiary dark:text-white">
      {user.profilePictureUrl && (
        <div className="size-9">
          <Image
            src={`https://pm-s3-bucket-imagez.s3.ap-south-1.amazonaws.com/${user.profilePictureUrl!}`}
            alt="profile picture"
            width={32}
            height={32}
            className="h-full rounded-full object-cover"
          />
        </div>
      )}
      <div className="ml-4">
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;

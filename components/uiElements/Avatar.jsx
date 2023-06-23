import React from "react";

import Image from "next/image";

import "./Avatar.scss";

const Avatar = ({ src, name, width }) => {
  return (
    <Image
      className="avatar-user"
      src={src ?? ""}
      alt={name ?? ""}
      width={width}
      height={width}
    />
  );
};

export default Avatar;

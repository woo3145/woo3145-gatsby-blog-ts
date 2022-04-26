import React from "react";
import { IoLogoGithub, IoMailSharp } from "react-icons/io5";
import "./index.scss";

interface ISocial {
  gitHub?: string;
  email?: string;
}

interface Props {
  social: ISocial;
}

const IconPicker = (name: keyof ISocial) => {
  const props = { className: "icon" };
  switch (name) {
    case "gitHub":
      return <IoLogoGithub {...props} />;
    case "email":
      return <IoMailSharp {...props} />;
    default:
      return null;
  }
};

const SocialBar = ({ social }: Props) => {
  return (
    <div>
      {(Object.keys(social) as Array<keyof ISocial>).map((social_name, idx) => {
        return (
          social[social_name] && (
            <a
              key={idx}
              target="_blank"
              href={`${social_name === "email" ? "mailto:" : ""}${
                social[social_name]
              }`}
            >
              {IconPicker(social_name)}
            </a>
          )
        );
      })}
    </div>
  );
};

export default SocialBar;

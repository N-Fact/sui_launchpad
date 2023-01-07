import discord from "images/socials/discord.svg";
import medium from "images/socials/medium.svg";
import twitter from "images/socials/twitter.svg";
import { FC } from "react";
import { SocialType } from "shared/SocialsShare/SocialsShare";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  { name: "Twitter", icon: twitter, href: "https://twitter.com/DwarfKnightsDAO" },
  { name: "Discord", icon: discord, href: "https://discord.gg/m8vgCfeDfG" },
  { name: "Medium", icon: medium, href: "https://medium.com/@dwarfknights" },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6",
  socials = socialsDemo,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-4 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <img src={item.icon} alt="" />
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;

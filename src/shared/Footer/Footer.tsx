import DividerDwarf from "components/DividerDwarf";
import { CustomLink } from "data/types";
import React from "react";
import Logo from "shared/Logo/Logo";
import SocialsList from "shared/SocialsList/SocialsList";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [




];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>

      </div>
    );
  };

  return (
    <div className="overflow-hidden">
      <DividerDwarf />
      <div className="nc-Footer relative py-10 lg:pt-10 lg:pb-10 dark:border-neutral-700">
        <div className="container">
          <div className="flex justify-between items-center">
            <Logo />
            <SocialsList />
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
    </div>

  );
};

export default Footer;

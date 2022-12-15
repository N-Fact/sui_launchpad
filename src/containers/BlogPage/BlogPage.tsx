import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import React from "react";
import { Helmet } from "react-helmet";
import SectionAds from "./SectionAds";
import SectionLatestPosts from "./SectionLatestPosts";
import SectionMagazine5 from "./SectionMagazine5";

// DEMO DATA

const BlogPage: React.FC = () => {
  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <Helmet>
        <title>Blog || Catapult is SUI based NFT Launchpad</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      {/* ======== ALL SECTIONS ======== */}
      <div className="container relative">
        {/* === SECTION 1 === */}
        <div className="pt-12 pb-16 lg:pb-28">
          <SectionMagazine5 />
        </div>

        {/* === SECTION 1 === */}
        <SectionAds />

        {/* === SECTION 8 === */}
        <SectionLatestPosts className="py-16 lg:py-28" />

        {/* === SECTION 1 === */}
        <SectionSubscribe2 className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
};

export default BlogPage;

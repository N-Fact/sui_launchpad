import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHero2 from "components/SectionHero/SectionHero2";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import SectionMagazine8 from "components/SectionMagazine8";
import SectionSliderCardNftVideo from "components/SectionSliderCardNftVideo";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import SectionSliderCollections2 from "components/SectionSliderCollections2";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { Helmet } from "react-helmet";
import SectionGridFeatureNFT2 from "./SectionGridFeatureNFT2";
import SectionLargeSlider from "./SectionLargeSlider";
import SectionVideos from "./SectionVideos";



function PageHome() {

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>Catapult || Catapult is SUI based NFT Launchpad</title>
      </Helmet>
   

      <div className="container relative mt-5 mb-20 sm:mb-24 lg:mt-20 lg:mb-32">
        {/* SECTION HERO */}
        <SectionHero2 />

      
        
      </div>
      <div style={{height: '100px'}}></div>
{/*
       <SectionHowItWork className="mt-24 lg:mt-40 xl:mt-48" />
      <div className="bg-neutral-100/70 dark:bg-black/20 py-20 lg:py-32">
        <div className="container">
          <SectionLargeSlider />
        </div>
      </div>
      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionMagazine8 />
        <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionGridAuthorBox
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          />
        </div>
        <SectionSliderCardNftVideo />
        <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionSliderCollections2 cardStyle="style2" />
        </div>
        <SectionSubscribe2 />
        <div className="relative py-20 lg:py-28">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <SectionGridFeatureNFT2 />
        </div>

        <SectionSliderCategories />
        <div className="relative py-20 lg:py-24">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        
        <SectionVideos />
      </div> */}
    </div>
  );
}

export default PageHome;

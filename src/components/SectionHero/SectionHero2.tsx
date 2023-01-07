import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import imagePng from "images/nft-showcase.png";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export interface SectionHero2Props {
  children?: React.ReactNode;
  className?: string;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "", children }) => {
  return (
    <div
      className={`nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-36 xl:pb-60 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] ">
            DAO based Nft Marketplace on SUI💧 Network 
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
          A different experience for Nft marketplace. What is the next meta?
 
          </span>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZvibQHScbQ5ZYFyVEySM9s_AnzOp80pdStjIZF-ept-73UQ/viewform" target="_blank" >
            <div  className = "ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 dark:text-neutral-200 px-4 py-3 sm:px-6 text-sm sm:text-base font-medium">
              Apply for Launch
            </div>
          </a>
            
           
          </div>
        </div>
        <div className="flex-grow">
          <img className="w-full" src={imagePng} alt="hero" />
        </div>
      </div>

      <div className="z-10 mb-12 lg:mb-0 lg:-mt-20 xl:-mt-48 w-full ">
        {/* <HeroSearchForm /> */}<p></p>
      </div>
    </div>
  );
};

export default SectionHero2;

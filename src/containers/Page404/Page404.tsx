import I404Png from "images/notfound.gif";
import React from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";

const Page404: React.FC = () => (
  <div className="nc-Page404">
    <Helmet>
      <title>404 || Dwarf React Template</title>
    </Helmet>
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <NcImage className="w-8/12 mx-auto" src={I404Png} />
        <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
          THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.{" "}
        </span>
        <div className="pt-8">
          <a className="connect-wallet-btn px-4 py-2" href="/">Return Home Page</a>
        </div>
      </header>
    </div>
  </div>
);

export default Page404;

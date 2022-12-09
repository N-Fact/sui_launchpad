import CardNFT from "components/CardNFT";
import Heading from "components/Heading/Heading";
import { FC } from "react";

//buraya hook ile apiden data cekilecek
export interface SectionGridFeatureNFTProps {
  title?: string;
  projects?: Array<any>;
}
const SectionGridFeatureNFT: FC<SectionGridFeatureNFTProps> = ({ title = "", projects = null }) => {

  return (
    <div className="nc-SectionGridFeatureNFT relative">
      <Heading>{title}</Heading>
      <div
        className={`grid gap-8 sm:grid-cols-2 xl:grid-cols-3 `}
      >
        {
          projects?.map((project, index) => (
            <CardNFT linkTo={"/nft-detail/" + project.slug} image={project.image} key={index} supply={project.supply} title={project.title} totalitems={project.total_supply} rounds={project.rounds} isEnd={false} />
          ))
        }
      </div>
      {/* PAGINATION */}
      {/* <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
        <Pagination />
      </div> */}
    </div>

  );
};

export default SectionGridFeatureNFT;

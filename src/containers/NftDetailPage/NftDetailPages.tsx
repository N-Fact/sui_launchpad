import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NftDetailCard2 from "./NftDetailCard2";

export interface NftDetailPageProps {
  className?: string;
}
const client = axios.create({
  baseURL: "https://blockchain.novemyazilim.com/api/v1/event/slug/"
});

const NftDetailPage: FC<NftDetailPageProps> = ({ className = "", }) => {
  const params = useParams();
  const [Project, setProject] = useState("")
  useEffect(() => {
    async function getProjet() {
      const response = await client.get("" + params.slug);
      setProject(response.data);
    }
    getProjet()
  }, [])

  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* SECTION LAERGE SLIDER */}
      <div className="bg-neutral-100/80 dark:bg-black/20 py-20 lg:py-32">
        <div className="container">
          <NftDetailCard2 project={Project} />
        </div>
      </div>
    </div>

  );
};

export default NftDetailPage;

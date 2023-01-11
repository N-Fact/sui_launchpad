import axios from "axios";
import Sidebar from "components/SideBar";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NftDetailCard2 from "./NftDetailCard2";
//import { SocketReader } from "components/Socket";

export interface NftDetailPageProps {
  className?: string;
}
const client = axios.create({
  baseURL: "https://suilaunchpad.novemyazilim.com/api/v1/event/slug/"
});

const NftDetailPage: FC<NftDetailPageProps> = ({ className = "", }) => {
  const params = useParams();
  const [Project, setProject] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function getProjet() {
      const response = await client.get("" + params.slug);
      setProject(response.data);
    }
    getProjet()
  }, [])

  return (
    <div><Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    <div className="nc-PageHome relaive overflow-hidden ">
      {/* SECTION LAERGE SLIDER */}
      
      
      <div className="bg-neutral-100/80 dark:bg-black/20 lg:py-20">
        <div className="container">
        
          <NftDetailCard2 project={Project} />
          
        </div>
      </div>
      
    </div></div>
    

  );
};

export default NftDetailPage;

import { isAddress } from "ethers/lib/utils";
import { useParams } from "react-router-dom";
import Empty from "../components/Flow/Empty";
import Mint from "../views/Mint";
import Project from "../views/Project";

const ProjectPage = () => {
  const { id } = useParams();

  if (id) {
    if (isAddress(id as string)) return <Mint address={id} />;
    return <Project id={id} />;
  }
  return <Empty message="Project Not Found" />;
};

export default ProjectPage;

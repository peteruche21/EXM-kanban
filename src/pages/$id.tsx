import { useParams } from "react-router-dom";
import Project from "../views/Project";

const ProjectPage = () => {
  const { id } = useParams();
  return <Project id={parseInt(id as string)} />;
};

export default ProjectPage;

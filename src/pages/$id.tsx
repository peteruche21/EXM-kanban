import { useParams } from "react-router-dom";
import Empty from "../components/Flow/Empty";
import Project from "../views/Project";

const ProjectPage = () => {
  const { id } = useParams();
  if (id) return  <Project id={id} />
  return <Empty message="Project Not Found"/>
};

export default ProjectPage;

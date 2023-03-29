import { Link } from "react-router-dom";

const ProjectButton = ({
  name,
  id,
  open,
}: {
  name: string;
  id: string;
  open: boolean;
}) => {
  return (
    <div className="break-inside-avoid max-w-sm mb-8">
      <Link
        to={`/${id}`}
        className={`btn btn-block capitalize justify-start shadow-lg btn-accent ${
          open ?  "" : "btn-outline"
        }`}
      >
        {name}
      </Link>
    </div>
  );
};

export default ProjectButton;

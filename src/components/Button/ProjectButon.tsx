import { Link } from "react-router-dom";

const ProjectButton = ({
  name,
  id,
  open,
}: {
  name: string;
  id: number;
  open: boolean;
}) => {
  return (
    <div>
      <Link
        to={`/${id}`}
        className={`btn btn-block capitalize justify-start shadow-lg ${
          open && "btn-active glass"
        }`}
      >
        {name}
      </Link>
    </div>
  );
};

export default ProjectButton;

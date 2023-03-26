import { Link } from "react-router-dom";
// @ts-ignore
import Typical from "react-typical";

const Landing = () => {
  return (
    <div className="flex flex-col px-4 h-[90vh]">
      <div className="m-auto">
        <h1 className="text-5xl font-semibold text-secondary">
          <Typical
            steps={[
              "Fast",
              2500,
              "Chain Agnostic",
              2500,
              "Lightweight",
              2600,
              "Self Hosted",
              2500,
            ]}
            wrapper="p"
            loop={Infinity}
          />
        </h1>
        <h1 className="text-5xl font-semibold">
          Project Management Solution for Teams.
        </h1>
        <div className="py-10 space-x-6">
          <Link
            to="/login"
            className="btn btn-lg btn-secondary capitalize shadow-lg"
          >
            Get Started
          </Link>
          <Link to="#" className="btn btn-lg capitalize shadow-lg">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

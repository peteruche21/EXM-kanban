import { useQuery } from "@tanstack/react-query";
import Alert from "../components/Alert";
import ProjectButton from "../components/Button/ProjectButon";
import Empty from "../components/Flow/Empty";
import Loading from "../components/Flow/Loading";
import { ProjectForm } from "../components/Form/Forms";

const Projects = () => {
  const { isLoading, isFetched, isError, data, refetch, isSuccess } = useQuery({
    queryKey: ["projects"],
    queryFn: async () =>
      fetch(
        "https://api-goerli.basescan.org/api?module=account&action=balance&address=0x33e0e07ca86c869ade3fc9de9126f6c73dad105e&apikey=YourApiKeyToken"
      ),
    retry: 5,
  });

  const refresh = async () => {
    await refetch();
  };

  const renderProjectsList = (): JSX.Element[] | undefined => {
    return [
      { name: "john is an open project", id: 0, open: true },
      { name: "peter", id: 2, open: true },
    ].map((project, id) => {
      return <ProjectButton name={project.name} id={id} open={project.open}/>;
    });
  };

  return (
    <div className="w-full h-full mb-auto py-20 px-8">
      <div className="flex justify-between mb-10 gap-10">
        <div className="inline-flex ">
          {isLoading && <Loading />}
          {isFetched && (
            <button className="btn btn-circle" onClick={refresh}>
              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          )}
        </div>
        <ProjectForm />
      </div>

      <div className="max-w-sm m-auto space-y-4 max-h-[48rem] overflow-x-scroll">
        {isError ? (
          <Alert
            status="warning"
            message="Please ensure you are connected to the internet."
          />
        ) : isSuccess ? (
          [""].length > 0 ? (
            renderProjectsList()
          ) : (
            <Empty message="No Project Found" />
          )
        ) : (
          <Alert
            status="error"
            message="Oops! Something happened. please try again!"
          />
        )}
      </div>
    </div>
  );
};

export default Projects;

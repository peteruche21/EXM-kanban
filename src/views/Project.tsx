import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import ActionButton from "../components/Button/ActionButton";
import TaskCard from "../components/Cards/TaskCard";
import Empty from "../components/Flow/Empty";
import Loading from "../components/Flow/Loading";
import { TaskForm } from "../components/Form/Forms";
import Modal from "../components/Modal";
import { ITask } from "../types";
//@ts-ignore
import { Draggable, Droppable } from "react-drag-and-drop";
import db from "../db/polybase/sdk";

const Project = ({ id }: { id: string }) => {
  const {
    isLoading,
    isFetched,
    isFetching,
    isError,
    data,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => await db.get(),
    retry: 5,
  });

  const { data: project, refetch: projectRefetch } = useQuery({
    queryKey: ["project"],
    queryFn: async () => db.getProject(id),
    retry: 5,
  });

  const dragMutation = useMutation({
    mutationFn: async (data: {
      key: string;
      status: "TODO" | "DOING" | "DONE";
    }) => {
      return await db.changeStatus(data.key, data.status);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async () => {
      return await db.toggleProject(id);
    },
  });

  const refresh = async () => {
    await refetch();
  };

  const toggleProject = async () => {
    await toggleMutation.mutateAsync();
    await projectRefetch();
  };

  const filterTasks = (status: string) => {
    return data?.data.reduce((acc, task) => {
      if (task.data.status === status && task.data.projectId === id) {
        acc.push(task.data);
      }
      return acc;
    }, [] as ITask[]);
  };

  const renderToDoTasks = (): JSX.Element[] | undefined => {
    return filterTasks("TODO")?.map((task, index) => {
      return (
        <Draggable type="dnd" data={task.id} key={index}>
          <TaskCard
            data={task}
            id={task.id}
            open={project?.data.open}
            callback={refresh}
          />
        </Draggable>
      );
    });
  };

  const renderDoingTasks = (): JSX.Element[] | undefined => {
    return filterTasks("DOING")?.map((task, index) => {
      return (
        <Draggable type="dnd" data={task.id} key={index}>
          <TaskCard
            data={task}
            id={task.id}
            open={project?.data.open}
            callback={refresh}
          />
        </Draggable>
      );
    });
  };

  const renderDoneTasks = (): JSX.Element[] | undefined => {
    return filterTasks("DONE")?.map((task, index) => {
      return (
        <Draggable type="dnd" data={task.id} key={index}>
          <TaskCard
            data={task}
            id={task.id}
            open={project?.data.open}
            callback={refresh}
          />
        </Draggable>
      );
    });
  };

  const handleDrop = async (
    data: { dnd: string },
    to: "TODO" | "DOING" | "DONE"
  ) => {
    if (project?.data.open) {
      await dragMutation.mutateAsync({ key: data.dnd, status: to });
      await refetch();
    }
  };

  return (
    <div className="w-full h-full mb-auto py-20 px-8 relative">
      <div className="flex justify-between mb-10 gap-10">
        <div className="inline-flex ">
          {isLoading || isFetching ? (
            <Loading />
          ) : (
            <button className="btn btn-circle" onClick={refresh}>
              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          )}
        </div>
        <div className="inline-flex gap-4">
          {/*  label */}
          {project?.data.open && (
            <label
              className={"btn btn-accent capitalize"}
              htmlFor={id + "project"}
            >
              new task
            </label>
          )}
          <ActionButton
            text={project?.data.open ? "close project" : "re-open"}
            type="button"
            classname={project?.data.open ? "" : "btn-outline"}
            callback={toggleProject}
          />
          {/* modal  */}
          <Modal docid={id + "project"}>
            {/* task form */}
            <TaskForm type="new" id={id} onUpdate={refresh} />
          </Modal>
        </div>
      </div>

      <div className="h-[48rem] overflow-auto">
        {isError ? (
          <Alert
            status="warning"
            message="Please ensure you are connected to the internet."
          />
        ) : isSuccess ? (
          data?.data?.length > 0 ? (
            <div className="max-w-screen-xl mx-auto h-full">
              <div className="max-w-none overflow-x-auto h-full">
                <div className="grid grid-cols-3 gap-4 w-max h-full">
                  <Droppable
                    types={["dnd"]}
                    onDrop={(data: { dnd: string }) => handleDrop(data, "TODO")}
                  >
                    <div className=" p-4 rounded-lg w-80 md:w-96 h-full">
                      <h2 className="text-xl font-semibold mb-4">To Do</h2>
                      {renderToDoTasks()}
                    </div>
                  </Droppable>

                  <Droppable
                    types={["dnd"]}
                    onDrop={(data: { dnd: string }) =>
                      handleDrop(data, "DOING")
                    }
                  >
                    <div className=" p-4 rounded-lg w-80 md:w-96 h-full">
                      <h2 className="text-xl font-semibold mb-4">Doing</h2>
                      {renderDoingTasks()}
                    </div>
                  </Droppable>

                  <Droppable
                    types={["dnd"]}
                    onDrop={(data: { dnd: string }) => handleDrop(data, "DONE")}
                  >
                    <div className=" p-4 rounded-lg w-80 md:w-96 h-full">
                      <h2 className="text-xl font-semibold mb-4">Done</h2>
                      {renderDoneTasks()}
                    </div>
                  </Droppable>
                </div>
              </div>
            </div>
          ) : (
            <Empty message="No Task Created" />
          )
        ) : (
          isFetched &&
          !isError &&
          !isSuccess && (
            <Alert
              status="error"
              message="Oops! Something happened. please try again!"
            />
          )
        )}
      </div>

      <div className="bottom-3 left-0 absolute">
        <Link
          to={`/projects`}
          className="btn btn-link shadow-none capitalize justify-start"
        >
          go back
        </Link>
      </div>
    </div>
  );
};

export default Project;

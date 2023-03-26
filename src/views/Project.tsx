import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import ActionButton from "../components/Button/ActionButton";
import TaskCard from "../components/Cards/TaskCard";
import Empty from "../components/Flow/Empty";
import Loading from "../components/Flow/Loading";
import { TaskForm } from "../components/Form/Forms";
import Modal from "../components/Modal";
import { IInput, ITask } from "../types";
//@ts-ignore
import { Draggable, Droppable } from "react-drag-and-drop";

const Project = ({ id }: { id: number }) => {
  const { isLoading, isFetched, isError, data, refetch, isSuccess } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await fetch("https://api-goerli.basescan.org"),
    retry: 5,
  });

  const dragMutation = useMutation({
    mutationFn: (input: IInput) => {
      return fetch("https://api-goerli.basescan.org");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: () => {
      return fetch("https://api-goerli.basescan.org");
    },
  });

  const refresh = async () => {
    await refetch();
  };

  const toggleProject = async () => {
    await toggleMutation.mutateAsync();
  };

  const filterTasks = (status: string) => {
    return [
      {
        projectId: id,
        status: "TODO",
        title: "first task",
        description: "my first actual task",
        duration: [Date.now(), Date.now()],
        assignee: "oxstring",
        PR: "",
        priority: "LOW",
      },
      {
        projectId: id,
        status: "DOING",
        title: "second task",
        description: "a god second task",
        duration: [Date.now(), Date.now()],
        assignee: "0xsting",
        PR: "https://www.github.com",
        priority: "HIGH",
      },
      {
        projectId: id,
        status: "DOING",
        title: "second task",
        description: "a god second task",
        duration: [Date.now(), Date.now()],
        assignee: "0xsting",
        PR: "https://www.github.com",
        priority: "HIGH",
      },
      {
        projectId: id,
        status: "DONE",
        title: "third post",
        description: "a good third description",
        duration: [Date.now(), Date.now()],
        assignee: "0xstring",
        PR: "",
        priority: "MEDIUM",
      },
    ].reduce((acc, task, index) => {
      if (task.status === status && task.projectId === id) {
        //@ts-ignore
        acc.push({ ...task, id: index });
      }
      return acc;
    }, [] as ITask[]);
  };

  const renderToDoTasks = (): JSX.Element[] | undefined => {
    return filterTasks("TODO")?.map((task, index) => {
      return (
        <Draggable type="dnd" data={(task as any).id} key={index}>
          <TaskCard data={task} id={index} callback={refresh} />
        </Draggable>
      );
    });
  };

  const renderDoingTasks = (): JSX.Element[] | undefined => {
    return filterTasks("DOING")?.map((task, index) => {
      return (
        <Draggable type="dnd" data={(task as any).id} key={index}>
          <TaskCard data={task} id={index} callback={refresh} />
        </Draggable>
      );
    });
  };

  const renderDoneTasks = (): JSX.Element[] | undefined => {
    return filterTasks("DONE")?.map((task, index) => {
      return (
        <Draggable type="dnd" data={(task as any).id} key={index}>
          <TaskCard data={task} id={index} callback={refresh} />
        </Draggable>
      );
    });
  };
  const handleDrop = (data: any, event: any) => {
    console.log(data, event);
  };
  return (
    <div className="w-full h-full mb-auto py-20 px-8 relative">
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
        <div className="inline-flex gap-4">
          {/*  label */}
          <label
            className="btn btn-accent capitalize"
            htmlFor={id.toString() + "project"}
          >
            new task
          </label>
          <ActionButton
            text="close project"
            type="button"
            callback={toggleProject}
          />
          {/* modal  */}
          <Modal docid={id.toString() + "project"}>
            {/* task form */}
            <TaskForm type="new" onUpdate={refresh} />
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
          [""].length > 0 ? (
            <div className="max-w-screen-xl mx-auto">
              <div className="max-w-none overflow-x-auto">
                <div className="grid grid-cols-3 gap-4 w-max">
                  <Droppable types={["dnd"]} onDrop={handleDrop}>
                    <div className=" p-4 rounded-lg w-80 md:w-96">
                      <h2 className="text-xl font-semibold mb-4">To Do</h2>
                      {renderToDoTasks()}
                    </div>
                  </Droppable>

                  <Droppable types={["dnd"]} onDrop={handleDrop}>
                    <div className=" p-4 rounded-lg w-80 md:w-96">
                      <h2 className="text-xl font-semibold mb-4">Doing</h2>
                      {renderDoingTasks()}
                    </div>
                  </Droppable>

                  <Droppable types={["dnd"]} onDrop={handleDrop}>
                    <div className=" p-4 rounded-lg w-80 md:w-96">
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
          <Alert
            status="error"
            message="Oops! Something happened. please try again!"
          />
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

import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import db from "../../db/polybase/sdk";
import { ITaskCardProps } from "../../types";
import { TaskForm } from "../Form/Forms";
import Modal from "../Modal";
import ViewTaskCard from "./ViewTaskCard";

const TaskCard = ({ data, id, open, callback }: ITaskCardProps) => {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return await db.remove(id);
    },
  });

  const deleteTask = async () => {
    if (open) {
      await mutation.mutateAsync(id);
      if (callback) await callback();
    }
  };

  return (
    <div className="card mb-8 max-w-[384px] break-inside-avoid shadow-xl bg-neutral">
      <label htmlFor={id + "task view"}>
        <div className="card-body">
          <div className="badge-secondary badge font-bold ml-auto">
            {data.priority}
          </div>
          <h2 className="card-title text-left">{data.title}</h2>
          <div className="flex gap-4">
            <h4 className="text-sm font-bold">
              from:{" "}
              {data.duration?.length === 2
                ? moment.unix(data.duration?.[0]).format("DD-MM")
                : "---"}
            </h4>
            <h4 className="text-sm font-bold">
              To:{" "}
              {data.duration?.length === 2
                ? moment.unix(data.duration?.[1]).format("DD-MM")
                : "---"}
            </h4>
          </div>
          <h4 className="text-sm font-bold italic text-left">
            assignee:{" "}
            <span className="text-primary lowercase">
              {`${data.assignee?.substring(0, 6)}...${data.assignee?.substring(
                37,
                42
              )}` ?? "-"}
            </span>
          </h4>
        </div>
      </label>
      {open && (
        <div className="card-actions btn-group absolute -bottom-3 right-5 justify-end gap-0">
          {/* edit link */}
          <label className="btn btn-sm" htmlFor={id + "task"}>
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
            </svg>
          </label>

          {/* delete link */}
          <button className="btn btn-sm" onClick={() => void deleteTask()}>
            {mutation.isLoading ? (
              <svg
                aria-hidden="true"
                fill="currentColor"
                className="h-5 w-5 dark:text-white "
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                  fillRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  fillRule="evenodd"
                ></path>
              </svg>
            )}
          </button>
        </div>
      )}

      <Modal docid={id + "task"}>
        <TaskForm type="update" id={id} onUpdate={callback} data={data} />
      </Modal>
      <Modal docid={id + "task view"}>
        <ViewTaskCard data={data} />
      </Modal>
    </div>
  );
};

export default TaskCard;

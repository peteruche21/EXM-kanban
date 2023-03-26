import React from "react";
import { ITaskCardProps } from "../../types";
import { TaskForm } from "../Form/Forms";
import Modal from "../Modal";

const TaskCard = ({ data, id, callback }: ITaskCardProps) => {
  return (
    <div className="card mb-8 max-w-[600px] break-inside-avoid shadow-xl dark:bg-neutral">
      <div className="card-body">
        <div className="inline-flex justify-between">
          <h3 className="text-md font-thin">text</h3>
          <div className="badge-primary badge font-bold">
            text
          </div>
        </div>
        <h2 className="card-title">text</h2>
        <div className="flex gap-4">
          <h4 className="text-xs font-bold italic">
            created at:{" "}
            text
          </h4>
          <h4 className="text-xs font-bold italic">
            last updated at:{" "}
            {new Date().toLocaleDateString()}
          </h4>
        </div>
      </div>

      <div className="card-actions btn-group absolute -bottom-3 right-5 justify-end gap-0">
          <button className="btn btn-disabled btn-active btn-sm">
           text
          </button>
          <button className="btn btn-sm">
            <svg
              fill="currentColor"
              className="h-5 w-5 text-red-600"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
      <Modal docid={id.toString()}>
        <TaskForm />
      </Modal>
    </div>
  );
};

export default TaskCard;

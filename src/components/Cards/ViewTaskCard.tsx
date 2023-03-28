import moment from "moment";
import { ITask } from "../../types";

const ViewTaskCard = ({ data }: { data: ITask }) => {
  return (
    <div className="card">
      <div className="card-body relative space-y-3">
        <div className="flex justify-between">
          {/* task id and priority */}
          <div className="italic font-light inline-flex items-center">
            {data.id?.substring(0, 4)}...{data.id?.substring(65, 71)}
            <span className="px-2">
              <button onClick={() => navigator.clipboard.writeText(data.id)}>
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    clipRule="evenodd"
                    d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z"
                    fillRule="evenodd"
                  ></path>
                  <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z"></path>
                  <path d="M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z"></path>
                </svg>
              </button>
            </span>
          </div>
          <div className="badge-secondary badge font-bold">{data.priority}</div>
        </div>
        {/* task title */}
        <div>
          <h2 className="card-title">{data.title}</h2>
        </div>
        {/* task description */}
        <div>
          <h2 className="text-left">{data.description}</h2>
        </div>
        {/* task duration */}
        <div className="flex gap-4 justify-between">
          <h4 className="text-sm font-bold">
            from:
            <span className="pl-3 text-primary">
              {moment.unix(data.duration?.[0]!).format("DD-MM-YYYY") ?? "-"}
            </span>
          </h4>
          <h4 className="text-sm font-bold">
            To:
            <span className="pl-3 text-primary">
              {moment.unix(data.duration?.[1]!).format("DD-MM-YYYY") ?? "-"}
            </span>
          </h4>
        </div>

        {/* task assignee */}
        <div>
          <h4 className="text-sm font-bold italic text-left">
            assignee:
            <span className="pl-3 text-primary">
              {`${data.assignee?.substring(0, 6)}...${data.assignee?.substring(
                37,
                42
              )}` ?? "-"}
            </span>
          </h4>
        </div>

        {/* status */}

        <div>
          <h2
            className={`bottom-2 text-center ${
              data.status === "DOING"
                ? "text-accent"
                : data.status === "DONE"
                ? "text-green-500"
                : "text-secondary"
            }`}
          >
            {data.status}
          </h2>
        </div>

        {/* pr  */}
        <a
          href={data.PR}
          className={`btn btn-sm btn-circle absolute bottom-0 right-0 ${
            !data.PR && "disabled"
          }`}
        >
          <svg
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ViewTaskCard;

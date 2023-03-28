import { useMutation } from "@tanstack/react-query";
import { useConnectWallet } from "@web3-onboard/react";
import { Controller, useForm } from "react-hook-form";
import { IProject, ITask, ITaskFormProps } from "../../types";
import ActionButton from "../Button/ActionButton";
import Loading from "../Flow/Loading";
import { useState } from "react";
//@ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import db from "../../db/polybase/sdk";
import { generateId } from "../../utils/generateId";
import moment from "moment";
import DateButton from "../Date";

const ProjectForm = ({ callback }: { callback: () => void }) => {
  const [{ wallet }] = useConnectWallet();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProject>();

  const mutation = useMutation({
    mutationFn: async (project: IProject) => {
      return await db.newProject(project);
    },
  });

  const onSubmit = async (data: IProject) => {
    console.log(data);
    data = {
      id: generateId("project", data.name),
      name: data.name,
      owner: wallet?.accounts[0].address as string,
      open: true,
    };

    const result = await mutation.mutateAsync(data);

    if (mutation.isError) {
      console.log(mutation.error);
    }
    console.log(result.data);
    callback();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md space-x-5 inline-flex"
    >
      <div>
        <input
          type="text"
          id="name"
          placeholder="project name"
          className={`input input-bordered w-full max-w-xs ${
            errors.name && "border-red-500"
          }`}
          {...register("name", { required: true })}
        />
      </div>

      {mutation.isLoading ? (
        <Loading />
      ) : (
        <ActionButton text="New" type="submit" />
      )}
    </form>
  );
};

const TaskForm = ({ type, id, data, onUpdate }: ITaskFormProps) => {
  const [startDate, setStartDate] = useState<number>();
  const [stopDate, setStopDate] = useState<number>();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ITask>();

  const createMutation = useMutation({
    mutationFn: async (task: ITask) => {
      return await db.create(task);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (task: ITask) => {
      return fetch("https://api-goerli.basescan.org");
    },
  });

  const onSubmit = async (data: ITask) => {
    let result;
    if (type == "new") {
      data = {
        id: generateId("task", data.title),
        projectId: id,
        status: "TODO",
        title: data.title,
        description: data.description,
        duration: startDate && stopDate ? [startDate, stopDate] : undefined,
        assignee: data.assignee,
        PR: data.PR,
        priority: data.priority,
      };
      console.log(data);
      result = await createMutation.mutateAsync(data);
    } else {
      await updateMutation.mutateAsync(data);
    }
    // alert the user
    createMutation.isError && console.log(createMutation.error);
    updateMutation.isError && console.log(updateMutation.error);
    console.log(result);
    reset({
      title: "",
      description: "",
      status: undefined,
      PR: "",
      duration: [],
      assignee: "",
      priority: undefined,
    });
    setStartDate(undefined);
    setStopDate(undefined);
    if (onUpdate) await onUpdate();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-8">
      <div>
        {/* title */}
        <input
          type="text"
          id="title"
          placeholder="title"
          className={`input w-full max-w-md ${
            errors.title && "border-red-500"
          }`}
          {...register("title", { required: true, value: data?.title })}
        />
      </div>
      {/* description */}
      <textarea
        id="body"
        placeholder="description"
        className={` textarea textarea-lg h-[150px] w-full max-w-md ${
          errors.description && "border-red-500"
        }`}
        {...register("description", {
          required: true,
          value: data?.description,
        })}
      />

      {/* date */}
      <div className="flex justify-around">
        <div className="inline-flex gap-3">
          <span>from </span>
          <DateButton value={startDate} setValue={setStartDate} />
        </div>

        <div className="inline-flex gap-3">
          <DateButton value={stopDate} setValue={setStopDate} />
          <span>to </span>
        </div>
      </div>

      <div className="inline-flex justify-around w-full">
        {/* priority */}
        <Controller
          control={control}
          name="priority"
          defaultValue="LOW"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { isTouched, isDirty, error },
            formState,
          }) => (
            <select
              className="select select-ghost"
              onChange={(val) => onChange(val.target.value)}
            >
              <option>Priority</option>
              <option defaultValue="LOW" value="LOW">
                LOW
              </option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          )}
        />
        {/* assignee */}
        <input
          type="text"
          id="assignee"
          placeholder="assign"
          className="input w-44"
          {...register("assignee", { value: data?.assignee })}
        />
      </div>

      {/* PR */}
      <div className="relative">
        <svg
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="w-5 h-5 absolute right-2 bottom-4"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
        >
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
        <input
          type="text"
          id="PR"
          placeholder="pull request"
          className="input  w-full max-w-md"
          {...register("PR", { value: data?.PR })}
        />
      </div>

      {createMutation.isLoading || updateMutation.isLoading ? (
        <button className="loading btn-primary btn-block btn"></button>
      ) : (
        <button type="submit" className="btn-primary btn-block btn">
          Submit
        </button>
      )}
    </form>
  );
};

export { ProjectForm, TaskForm };

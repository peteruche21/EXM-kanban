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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-5">
      <div>
        {/* title */}
        <input
          type="text"
          id="title"
          placeholder="title"
          className={`input input-bordered w-full max-w-md ${
            errors.title && "border-red-500"
          }`}
          {...register("title", { required: true, value: data?.title })}
        />
      </div>
      {/* description */}
      <textarea
        id="body"
        placeholder="description"
        className={`textarea-bordered textarea textarea-lg h-[150px] w-full max-w-md ${
          errors.description && "border-red-500"
        }`}
        {...register("description", {
          required: true,
          value: data?.description,
        })}
      />

      {/* date */}
      <div className="inline-flex">
        <span>from </span>
        <div className="border border-gray-500 rounded-lg">
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(moment(date).unix())}
          />
        </div>

        <span>to </span>
        <div className="border border-gray-500 rounded-lg">
          <DatePicker
            selected={stopDate}
            onChange={(date: any) => setStopDate(moment(date).unix())}
          />
        </div>
      </div>

      <div className="inline-flex">
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
              <option defaultValue="LOW" value="LOW">
                LOW
              </option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          )}
        />

        {/* PR */}
        <input
          type="text"
          id="PR"
          placeholder="PR"
          className="input input-bordered w-full max-w-md"
          {...register("PR", { value: data?.PR })}
        />
      </div>

      {/* assignee */}
      <input
        type="text"
        id="assignee"
        placeholder="assign"
        className="input input-bordered w-full max-w-md"
        {...register("assignee", { value: data?.assignee })}
      />

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

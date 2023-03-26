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
import {
  arrToBufArr,
  keccak256,
  keccakFromString,
  sha256,
  toBuffer,
} from "ethereumjs-util";

const ProjectForm = () => {
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
      id: sha256(keccakFromString(data.name + data.owner)).toString(),
      ...data,
      owner: wallet?.accounts[0].address as string,
      open: true,
    };

    const result = await mutation.mutateAsync(data);

    if (mutation.isError) {
      console.log(mutation.error);
    }
    console.log(result.data);
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
  const [startDate, setStartDate] = useState();
  const [stopDate, setStopDate] = useState();

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
    data = {
      id: sha256(
        keccakFromString(data.title + data.description!.toString())
      ).toString(),
      // @ts-ignore
        projectId: id,
      status: "TODO",
      title: data.title,
      description: data.description,
      duration: [startDate!, stopDate!],
      assignee: data.assignee,
      PR: data.PR,
      priority: data.priority,
    };

    console.log(data)

    const result =
      type === "new"
        ? await createMutation.mutateAsync(data)
        : await updateMutation.mutateAsync(data);
    // alert the user
    createMutation.isError && console.log(createMutation.error);
    updateMutation.isError && console.log(updateMutation.error);
    console.log(result);
    reset({ title: "" });
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
        className={`textarea-bordered textarea textarea-lg h-[400px] w-full max-w-md ${
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
            onChange={(date: any) => setStartDate(date)}
          />
        </div>

        <span>to </span>
        <div className="border border-gray-500 rounded-lg">
          <DatePicker
            selected={stopDate}
            onChange={(date: any) => setStopDate(date)}
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

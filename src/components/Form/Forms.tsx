import { useMutation } from "@tanstack/react-query";
import { useConnectWallet, useWallets } from "@web3-onboard/react";
import { useForm } from "react-hook-form";
import { IProject, ITask, ITaskFormProps } from "../../types";
import ActionButton from "../Button/ActionButton";
import Loading from "../Flow/Loading";

const ProjectForm = () => {
  const [{ wallet }] = useConnectWallet();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProject>();

  const mutation = useMutation({
    mutationFn: (project: IProject) => {
      return fetch("https://api-goerli.basescan.org");
    },
  });

  const onSubmit = async (data: IProject) => {
    data = {
      ...data,
      open: true,
      owner: wallet?.accounts[0].address as string,
    };

    const result = await mutation.mutateAsync(data);

    if (mutation.isError) {
      console.log(mutation.error);
    }
    console.log(result.status);
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITask>();

  const createMutation = useMutation({
    mutationFn: (task: ITask) => {
      return fetch("https://api-goerli.basescan.org");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (task: ITask) => {
      return fetch("https://api-goerli.basescan.org");
    },
  });

  const onSubmit = async (data: ITask) => {
    const result =
      type === "new"
        ? await createMutation.mutateAsync(data)
        : await updateMutation.mutateAsync(data);
    // alert the user
    createMutation.isError && console.log(createMutation.error);
    updateMutation.isError && console.log(updateMutation.error);
    console.log(result.status);
    reset({ title: "" });
    if (onUpdate) await onUpdate();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-5">
      <div>
        {errors.title && (
          <p className="py-2 text-red-600">This field is required</p>
        )}
        <input
          type="text"
          id="title"
          placeholder="note title"
          className="input-bordered input w-full max-w-md"
          {...register("title", { required: true, value: data?.title })}
        />
      </div>
      <div>
        {errors.description && (
          <p className="pb-2 text-red-600">This field is required</p>
        )}

        <textarea
          id="body"
          placeholder="write your thoughts here"
          className="textarea-bordered textarea textarea-lg h-[400px] w-full max-w-md"
          {...register("description", {
            required: true,
            value: data?.description,
          })}
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

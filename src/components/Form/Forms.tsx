import { useMutation } from "@tanstack/react-query";
import { useConnectWallet, useWallets } from "@web3-onboard/react";
import { useForm } from "react-hook-form";
import { IProject } from "../../types";
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
      return fetch(
        "https://api-goerli.basescan.org/api?module=account&action=balance&address=0x33e0e07ca86c869ade3fc9de9126f6c73dad105e&apikey=YourApiKeyToken"
      );
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
          className={`input input-bordered w-full max-w-xs ${errors.name && "border-red-500"}`}
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

const TaskForm = () => {
  return <div>Forms</div>;
};

export { ProjectForm, TaskForm };

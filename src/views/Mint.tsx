import { useMutation, useQuery } from "@tanstack/react-query";
import Alert from "../components/Alert";
import Loading from "../components/Flow/Loading";
import { pass } from "../constants";
import contract from "../utils/contractHelper";
import { validateWithWhal3s } from "../utils/gate";

const Mint = ({ address }: { address: string }) => {
  // this is a secret mint page, you might want to restrict access to only particular address
  // and use window.ethereum instead of private key to call the mint function
  // for the demo of this application the admin private key is used
  // and anyone is allowed to mint.

  const { isError, data, refetch, isSuccess, isLoading } = useQuery({
    queryKey: ["secrete-place"],
    queryFn: async () => await validateWithWhal3s(address),
    retry: 5,
  });

  const mutation = useMutation({
    mutationFn: async (action: "mint" | "burn") => {
      try {
        const tx =
          action === "mint"
            ? await contract.safeMint(address, pass.tokenUri)
            : await contract.burn(data?.nfts[0].attributes.id.tokenId);
        await tx.wait();
      } catch (error) {
        console.log(action + " failed. probably out of gas");
        return;
      }
      await refetch();
    },
  });

  return (
    <div className="card w-96 text-neutral-content m-auto border">
      <div className="card-body items-center text-center">
        <h2 className="card-title">You Discovered the Admin Mint Shop!</h2>
        <p>
          for the purpose of this demo, if the mint fails, then there was not
          enough gas to handle the transaction.
        </p>
        {data?.valid ? (
          <p className="text-success">you own a pass nft</p>
        ) : (
          <p className="text-primary">mint your pass NFT below</p>
        )}
        {(isLoading || mutation.isLoading) && <Loading />}
        {isSuccess &&
          !mutation.isLoading &&
          (data.valid ? (
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                disabled
                onClick={() => mutation.mutateAsync("burn")}
              >
                Burn
              </button>
            </div>
          ) : (
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => mutation.mutateAsync("mint")}
              >
                Mint
              </button>
            </div>
          ))}
        {isError && !mutation.isLoading && (
          <Alert
            message="An Error occurred refresh page and try again"
            status="error"
          />
        )}
      </div>
    </div>
  );
};

export default Mint;

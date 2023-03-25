import axios from "axios";
import { pass } from "../constants";

const options = {
  headers: {
    accept: "application/json",
    authorization: `Bearer ${pass.whal3sApiKey}`,
  },
};

export async function validateWithWhal3s(address?: string) {
  return await axios
    .get(
      `https://app.whal3s.xyz/api/v0/nft-validation-utilities/${pass.nftValidationKey}/wallet/${address}`,
      options
    )
    .then((response) => response.data);
}

import { hc, type InferResponseType, type InferRequestType } from "hono/client";
import type { AppType } from "../../functions/api/[[route]]";

export const honoClient = hc<AppType>("/");

type Opt<T> = {
  args: InferRequestType<T>;
  token?: string;
};

export type Fetcher<T> = (opt: Opt<T>) => Promise<InferResponseType<T>>;

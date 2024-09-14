import { fetcher } from "~/fetcher";
import { tokenInfoSchema } from "./schemas";

const TOKEN_INFO_ENDPOINT = "https://oauth2.googleapis.com/tokeninfo" as const;

export const fetchTokenInfo = (token: string) => {
  return fetcher({
    request: {
      url: TOKEN_INFO_ENDPOINT,
      opt: { query: new URLSearchParams({ access_token: token }) },
    },
    response: { schema: tokenInfoSchema },
  });
};

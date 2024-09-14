import { type GoogleTokenParam, googleTokenEndpointSchema } from "./schemas";
import { HTTP_METHOD, fetcher } from "~/fetcher";

export const fetchToken = (
  tokenEndpoint: string,
  param: Omit<GoogleTokenParam, "grant_type">,
) => {
  return fetcher({
    request: {
      url: tokenEndpoint,
      opt: {
        body: new URLSearchParams({
          ...param,
          grant_type: "authorization_code",
        } satisfies GoogleTokenParam),
        headers: { "content-type": "application/x-www-form-urlencoded" },
        method: HTTP_METHOD.POST,
      },
    },
    response: { schema: googleTokenEndpointSchema },
  });
};

import { GOOGLE_WELL_KNOWN } from "./const";
import { googleWellKnownSchema } from "./schemas";
import { fetcher } from "~/fetcher";

export const fetchGoogleWellKnown = async () => {
  const result = await fetcher({
    request: { url: GOOGLE_WELL_KNOWN },
    response: { schema: googleWellKnownSchema },
  });
  return result;
};

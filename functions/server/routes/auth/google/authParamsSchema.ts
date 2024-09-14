import { z } from "zod";

export const googleAuthParamSchema = z.object({
  client_id: z.string(),
  response_type: z.literal("code"),
  scope: z.literal("openid email profile"),
  redirect_uri: z.string(),
  access_type: z.literal("offline"),
  state: z.string(),
});

export type GoogleAuthParam = z.TypeOf<typeof googleAuthParamSchema>;
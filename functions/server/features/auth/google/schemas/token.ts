import { z } from "zod";

export const GoogleTokenParamSchema = z.object({
  client_id: z.string(),
  client_secret: z.string(),
  grant_type: z.literal("authorization_code"),
  code: z.string(),
  redirect_uri: z.string(),
});

export type GoogleTokenParam = z.TypeOf<typeof GoogleTokenParamSchema>;

export const googleTokenEndpointSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string().optional(),
  id_token: z.string(),
  expires_in: z.number(),
  scope: z.string().or(z.null()),
  token_type: z.literal("Bearer"),
});

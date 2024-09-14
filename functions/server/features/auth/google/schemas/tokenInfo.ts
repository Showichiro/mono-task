import { z } from "zod";

export const tokenInfoValidSchema = z.object({
  azp: z.string(),
  aud: z.string(),
  sub: z.string(),
  scope: z.string(),
  exp: z.string(),
  expires_in: z.string(),
  email: z.string().optional(),
  email_verified: z.literal("true").or(z.literal("false")),
  access_type: z.string(),
});

export const tokenInfoSchema = tokenInfoValidSchema.or(
  z.object({ error: z.string().optional(), error_description: z.string() }),
);

export type TokenInfoResponse = z.TypeOf<typeof tokenInfoSchema>;
export type TokenInfo = z.TypeOf<typeof tokenInfoValidSchema>;

import { z } from "zod";

export const idTokenSchema = z.object({
  sub: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  name: z.string(),
  picture: z.string(),
  given_name: z.string(),
  family_name: z.string(),
});

export type IdTokenSchema = z.TypeOf<typeof idTokenSchema>;

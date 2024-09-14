import type { DrizzleD1Database } from "drizzle-orm/d1";
import type * as db from "~/schemas";
import type {
  GoogleWellKnownSchemaType,
  TokenInfo,
} from "~/features/auth/google/schemas";

export type Env = {
  Variables: {
    db: DrizzleD1Database<typeof db>;
    auth: {
      google:
        | {
            valid: true;
            wellKnown: GoogleWellKnownSchemaType;
          }
        | {
            valid: false;
          };
    };
    tokenInfo: TokenInfo;
  };
  Bindings: {
    DB: D1Database;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URI: string;
  };
};

import type { DrizzleD1Database } from "drizzle-orm/d1";
import type * as db from "../schemas/db";

export type Env = {
  Variables: {
    db: DrizzleD1Database<typeof db>;
  };
  Bindings: {
    DB: D1Database;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    REDIRECT_URI: string;
  };
};

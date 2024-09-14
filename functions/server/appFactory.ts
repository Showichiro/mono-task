import { type Context, Hono } from "hono";
import type { Env } from "./types/env";
import * as schema from "./schemas/db";
import { drizzle } from "drizzle-orm/d1";
import { fetchGoogleWellKnown, fetchTokenInfo } from "./features/auth/google";
import { bearerAuth } from "hono/bearer-auth";

export const factory = () => {
  const app = new Hono<Env>()
    // db
    .use(async (c, next) => {
      const db = drizzle(c.env.DB, { schema, logger: true });
      c.set("db", db);
      await next();
    })
    // well-known
    .use(async (c, next) => {
      const results = await Promise.all([fetchGoogleWellKnown()]);
      c.set("auth", {
        google: results[0].valid
          ? {
              valid: true,
              wellKnown: results[0].response,
            }
          : {
              valid: false,
            },
      });
      await next();
    })
    .use(
      "/api/authenticated/*",
      bearerAuth({
        verifyToken: async (token, c: Context<Env>) => {
          // TODO: Google Login以外の対応
          const result = await fetchTokenInfo(token);
          if (!result.valid || "error_description" in result.response) {
            return false;
          }
          c.set("tokenInfo", result.response);
          return true;
        },
      }),
    );
  return app;
};

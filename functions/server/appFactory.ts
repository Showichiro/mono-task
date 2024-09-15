import { logger } from "hono/logger";
import type { Env } from "./types/env";
import * as schema from "./schemas/db";
import { drizzle } from "drizzle-orm/d1";
import { fetchGoogleWellKnown } from "./features/auth/google";
import { requestId } from "hono/request-id";
import { createFactory } from "hono/factory";

export const factory = createFactory<Env>();

const setUpDb = factory.createMiddleware(async (c, next) => {
  const db = drizzle(c.env.DB, { schema, logger: true });
  c.set("db", db);
  await next();
});

const wellKnown = factory.createMiddleware(async (c, next) => {
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
});

export const appFactory = () => {
  const app = factory
    .createApp()
    .use("*", requestId())
    .use(logger())
    // db
    .use(setUpDb)
    // well-known
    .use(wellKnown);
  return app;
};

import { Hono } from "hono";
import type { Env } from "./types/env";
import * as schema from "./schemas/db";
import { drizzle } from "drizzle-orm/d1";

export const factory = () => {
  const app = new Hono<Env>().use(async (c, next) => {
    const db = drizzle(c.env.DB, { schema, logger: true });
    c.set("db", db);
    await next();
  });
  // TODO: set well-known
  // TODO: set authenticated route
  return app;
};

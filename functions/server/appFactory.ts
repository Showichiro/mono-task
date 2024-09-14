import { type Context, Hono } from "hono";
import { logger } from "hono/logger";
import type { Env } from "./types/env";
import * as schema from "./schemas/db";
import { drizzle } from "drizzle-orm/d1";
import { fetchGoogleWellKnown } from "./features/auth/google";
import { requestId } from "hono/request-id";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { and, eq, gte } from "drizzle-orm";

export const factory = () => {
  const app = new Hono<Env>()
    .use("*", requestId())
    .use(logger())
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
      zValidator(
        "cookie",
        z.object({
          session_id: z.string(),
        }),
        async (result, c: Context<Env>) => {
          if (!result.success) {
            throw new HTTPException(401, { message: "UnAuthorized" });
          }
          const { session_id } = result.data;
          // sessionデータの取得
          const rows = await c.var.db
            .select()
            .from(schema.session)
            .where(
              and(
                eq(schema.session, session_id),
                gte(schema.session.expiresIn, performance.now()),
              ),
            );
          const data = rows.at(0);
          if (!data) {
            await c.var.db
              .delete(schema.session)
              .where(eq(schema.session, session_id));
            throw new HTTPException(403, { message: "Forbidden" });
          }
          // セッション期限の更新
          await c.var.db
            .update(schema.session)
            .set({ expiresIn: performance.now() + 24 * 60 * 60 * 1000 })
            .where(eq(schema.session.id, session_id));
        },
      ),
    );
  return app;
};

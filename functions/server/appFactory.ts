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
          const data = await c.var.db.query.session.findFirst({
            where: and(
              eq(schema.session.id, session_id),
              gte(schema.session.expiresIn, performance.now()),
            ),
          });
          if (data == null) {
            throw new HTTPException(403, { message: "Forbidden" });
          }
          // セッション期限の更新
          const updatedRows = await c.var.db
            .update(schema.session)
            .set({ expiresIn: performance.now() + 24 * 60 * 60 * 1000 })
            .where(eq(schema.session.id, data.id))
            .returning();
          // user_idを引き継げるように設定
          const updated = updatedRows.at(0);
          if (updated) {
            const userIdRows = await c.var.db
              .select({ id: schema.users.id })
              .from(schema.users)
              .where(eq(schema.users.sub, updated.sub));
            const row = userIdRows.at(0);
            if (row != null) {
              // userId登録
              c.set("userId", row.id);
            }
          }
        },
      ),
    );
  return app;
};

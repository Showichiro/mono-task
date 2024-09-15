import { zValidator } from "@hono/zod-validator";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { factory } from "~/appFactory";
import type { Env } from "~/types";
import * as schema from "~/schemas/db";
import { and, eq, gte } from "drizzle-orm";

export const authenticatedMiddleware = factory.createMiddleware(
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

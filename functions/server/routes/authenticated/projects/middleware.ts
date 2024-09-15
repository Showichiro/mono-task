import type { Context } from "hono";
import { factory } from "~/appFactory";
import type { Env } from "~/types";

export const projectsRelationMiddleware = factory.createMiddleware(
  async (c: Context<Env, ":projectId?">, next) => {
    await next();
  },
);

export const projectsRoleMiddleware = factory.createMiddleware(
  async (c, next) => {
    await next();
  },
);

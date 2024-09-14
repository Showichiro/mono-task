import { handle } from "hono/cloudflare-pages";
import { factory } from "../server/app-factory";

const app = factory()
  .basePath("/api")
  .get("/hello", (c) => {
    return c.text("Hello Hono");
  });

export type AppType = typeof app;

export const onRequest = handle(app);

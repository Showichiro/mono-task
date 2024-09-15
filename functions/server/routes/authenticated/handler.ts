import { factory } from "~/appFactory";
import { authenticatedMiddleware } from "./middleware";

export const authenticatedHandler = factory
  .createApp()
  .use(authenticatedMiddleware);

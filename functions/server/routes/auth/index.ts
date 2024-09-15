import { factory } from "~/appFactory";
import { googleAuthHandler } from "./google";

export const authHandler = factory
  .createApp()
  .route("/google", googleAuthHandler);

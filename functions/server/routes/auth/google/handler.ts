import { Hono } from "hono";
import type { Env } from "../../../types";
import { HTTPException } from "hono/http-exception";
import type { GoogleAuthParam } from "./authParamsSchema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { fetchToken } from "~/features/auth/google";

export const googleAuthHandler = new Hono<Env>()
  .get("/login", (c) => {
    // TODO: stateの検証
    const state = crypto.randomUUID();
    const googleAuth = c.var.auth.google;
    if (!googleAuth.valid) {
      throw new HTTPException(400, { message: "unavailable to google auth" });
    }
    const {
      wellKnown: { authorization_endpoint },
    } = googleAuth;

    const param = new URLSearchParams({
      client_id: c.env.CLIENT_ID,
      response_type: "code",
      redirect_uri: c.env.GOOGLE_REDIRECT_URI,
      scope: "openid email profile",
      access_type: "offline",
      state,
    } satisfies GoogleAuthParam);

    return c.redirect(`${authorization_endpoint}?${param}`);
  })
  .get(
    "/callback",
    zValidator(
      "query",
      z.object({
        code: z.string(),
        state: z.string(),
      }),
      (result, c) => {
        if (!result.success) {
          return c.text("login failed", 404);
        }
      },
    ),
    async (c) => {
      const code = c.req.valid("query").code;
      const googleAuth = c.var.auth.google;
      if (!googleAuth.valid) {
        throw new HTTPException(400, { message: "unavailable to google auth" });
      }
      const tokenEndpoint = googleAuth.wellKnown.token_endpoint;
      const tokenResult = await fetchToken(tokenEndpoint, {
        client_id: c.env.CLIENT_ID,
        client_secret: c.env.CLIENT_SECRET,
        redirect_uri: c.env.GOOGLE_REDIRECT_URI,
        code,
      });
      if (!tokenResult.valid) {
        throw new HTTPException(400, {
          message: "failed to fetch token",
        });
      }
      return c.redirect(
        `/?${new URLSearchParams({
          access_token: tokenResult.response.access_token,
          refresh_token: tokenResult.response.refresh_token,
        })}`,
      );
    },
  );

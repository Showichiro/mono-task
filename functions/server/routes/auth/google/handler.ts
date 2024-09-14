import { Hono } from "hono";
import type { Env } from "../../../types";
import { HTTPException } from "hono/http-exception";
import type { GoogleAuthParam } from "./authParamsSchema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { fetchToken } from "~/features/auth/google";
import { setCookie } from "hono/cookie";
import { session } from "~/schemas";
import {
  type IdTokenSchema,
  idTokenSchema,
} from "~/features/auth/google/schemas";

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
      // session_idの発行
      const session_id = crypto.randomUUID();
      // subの特定
      const { id_token } = tokenResult.response;
      // TODO: 署名検証

      const decoded = decodeJWT(id_token);

      if (!decoded) {
        throw new HTTPException(400, { message: "failed to decode id_token" });
      }

      await c.var.db.insert(session).values({
        id: session_id,
        sub: decoded.sub,
        // 現在時刻から24時間
        expiresIn: performance.now() + 24 * 60 * 60 * 1000,
      });

      setCookie(c, "session_id", session_id);
      return c.redirect("/");
    },
  );

const decodeJWT = (token: string): IdTokenSchema | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join(""),
    );
    const rawJson = JSON.parse(jsonPayload);
    return idTokenSchema.parse(rawJson);
  } catch (e) {
    return null;
  }
};

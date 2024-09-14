import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const session = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  sub: text("sub").notNull(),
  expiresIn: int("expires_in").notNull(),
});

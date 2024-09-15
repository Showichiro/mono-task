import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const session = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  sub: text("sub").notNull(),
  expiresIn: int("expires_in").notNull(),
});

export const users = sqliteTable("users", {
  id: int("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  sub: text("sub").notNull(),
  picture: text("picture"),
});

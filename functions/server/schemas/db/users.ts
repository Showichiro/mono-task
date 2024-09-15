import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  sub: text("sub").notNull(),
  picture: text("picture"),
});

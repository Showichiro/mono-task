import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const tests = sqliteTable("tests", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

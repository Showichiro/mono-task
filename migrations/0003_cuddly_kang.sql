ALTER TABLE `session` ADD `expires_in` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `expires_at`;
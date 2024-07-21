CREATE TABLE `books` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text,
	`cover` text,
	`description` text,
	`pages` integer DEFAULT 0 NOT NULL,
	`publisher` text,
	`status` text NOT NULL,
	`progress` integer
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`book_id` text,
	`date` text NOT NULL,
	`page` integer,
	`text` text NOT NULL,
	FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`book_id` text,
	`date` text NOT NULL,
	`duration` integer NOT NULL,
	`pages` integer NOT NULL,
	FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);

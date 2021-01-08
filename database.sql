CREATE TABLE "todos" (
	-- columns go here
	-- "name" datatype restrictions
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(70) NOT NULL,
	"due" DATE,
	"priority" INT DEFAULT 1
);

INSERT INTO "todos" ("task", "due", "priority")
VALUES ('Homework', '2021-04-04', 4),
('Groceries', '2021-05-05', 2),
('Cleaning', '2021-07-07', 5);

INSERT INTO "todos" ("task", "due")
VALUES ('Networking', '2021-06-06');
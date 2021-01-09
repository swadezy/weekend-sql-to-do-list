CREATE TABLE "todos" (
	-- columns go here
	-- "name" datatype restrictions
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(70) NOT NULL,
	"due" DATE,
	"priority" INT DEFAULT 1,
	"status" VARCHAR(10) NOT NULL
);

INSERT INTO "todos" ("task", "due", "priority", "status")
VALUES ('Homework', '2021-04-04', 4, 'Pending'),
('Groceries', '2021-05-05', 2, 'Complete'),
('Cleaning', '2021-07-07', 5, 'Complete');

INSERT INTO "todos" ("task", "due", "status")
VALUES ('Networking', '2021-06-06', 'Pending');
-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE IF EXISTS contestants;
CREATE TABLE "contestants" (
    "contestant_id" int   NOT NULL,
    "name" varchar   NOT NULL,
    "notes" varchar   NOT NULL,
    "games_played" int   NOT NULL,
    "total_winnings" int   NOT NULL,
    CONSTRAINT "pk_contestants" PRIMARY KEY (
        "contestant_id"
     )
);

DROP TABLE IF EXISTS categories;
CREATE TABLE "categories" (
    "index" int NOT NULL,
    "category" varchar NOT NULL,
    "clue_count" int NOT NULL,
    CONSTRAINT "pk_categories" PRIMARY KEY (
        "index"
    )


);

DROP TABLE IF EXISTS questions;
CREATE TABLE "questions" (
    "question_id" int   NOT NULL,
    "show_number" int   NOT NULL,
    "air_date" date   NOT NULL,
    "round" varchar   NOT NULL,
	"category" varchar   NOT NULL,
	"value" varchar   NOT NULL,
    "question" varchar   NOT NULL,
	"answer" varchar   ,
    CONSTRAINT "pk_questions" PRIMARY KEY (
        "question_id"
     )
);


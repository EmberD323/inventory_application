#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS books,authors,genres;


CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author_name TEXT
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre_name TEXT
);

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  authorid INTEGER,
    CONSTRAINT authorid_fk FOREIGN KEY (authorid) REFERENCES authors(id) ON DELETE CASCADE,
  genreid INTEGER,
    CONSTRAINT genreid_fk FOREIGN KEY (genreid) REFERENCES genres(id) ON DELETE CASCADE
);

INSERT INTO authors (author_name) 
VALUES
    ('laura harkin'),
    ('robin hobb'),
    ('alice oseman');

INSERT INTO genres (genre_name) 
VALUES
     ('graphic novel'),
     ('fantasy'),
     ('romance');

INSERT INTO books (name,authorid,genreid) 
VALUES
     ('one-star romance',(SELECT id from authors where author_name = 'laura harkin'),(SELECT id from genres where genre_name = 'romance'));

INSERT INTO books (name,authorid,genreid) 
VALUES
     ('example',(SELECT id from authors where author_name = 'robin hobb'),(SELECT id from genres where genre_name = 'fantasy'));

INSERT INTO books (name,authorid,genreid) 
VALUES
     ('example2',(SELECT id from authors where author_name = 'alice oseman'),(SELECT id from genres where genre_name = 'graphic novel'));
`;




// 

// 
// INSERT INTO usernames (username) 
// VALUES
//   ('Bryan'),
//   ('Odin'),
//   ('Damon');

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  console.log("seeding...1");
  await client.connect();
  console.log("seeding...2");
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

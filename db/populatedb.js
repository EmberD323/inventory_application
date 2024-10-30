#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS books,authors,genres;


CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT
);

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  authorid INTEGER,
    CONSTRAINT authorid_fk FOREIGN KEY (authorid) REFERENCES authors(id),
  genreid INTEGER,
    CONSTRAINT genreid_fk FOREIGN KEY (genreid) REFERENCES genres(id)
);

INSERT INTO authors (name) 
VALUES
    ('Laura Harkin'),
    ('Robin Hobb'),
    ('Alice Oseman');

INSERT INTO genres (name) 
VALUES
     ('Graphic Novel'),
     ('Fantasy'),
     ('Romance');

INSERT INTO books (name,authorid,genreid) 
VALUES
     ('One-Star Romance',(SELECT id from authors where name = 'Laura Harkin'),(SELECT id from genres where name = 'Romance'));
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

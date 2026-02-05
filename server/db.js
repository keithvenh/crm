const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "crm.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS families (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );`
);

// db.prepare(`
//   INSERT INTO families (name) VALUES
//   ('VenHuizen'),
//   ('Collins'),
//   ('VenHuizen'),
//   ('Franczyk'),
//   ('Janni'),
//   ('Hall'),
//   ('Crandall'),
//   ('Crandall'),
//   ('Reed')`).run()

module.exports = db
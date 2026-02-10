const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "crm.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS account (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(64) NOT NULL,
    donor_number INTEGER,
    account_type TEXT DEFAULT 'Family'
  );`
);

db.exec(`
  CREATE TABLE IF NOT EXISTS contact (
    contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    phone VARCHAR(16),
    email VARCHAR(64),
    address VARCHAR(128),
    birthdate TEXT,
    anniversary TEXT,
    is_married BOOLEAN DEFAULT FALSE,
    is_minor BOOLEAN DEFAULT FALSE,
    crm_owner TEXT DEFAULT "@keith"
  );`
);

  db.exec(`
    CREATE TABLE IF NOT EXISTS account_contacts (
      account_contacts_id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id INTEGER NOT NULL,
      contact_id INTEGER NOT NULL,
      is_primary BOOLEAN DEFAULT FALSE,

      FOREIGN KEY (account_id) REFERENCES account(account_id),
      FOREIGN KEY (contact_id) REFERENCES contact(contact_id)
    );`
  );

// db.prepare(`
//   INSERT INTO account (name) VALUES
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
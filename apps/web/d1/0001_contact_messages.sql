-- Contact form submissions.
--
-- The form writes through a server function, so the browser never holds a
-- database credential and there is no public table endpoint to lock down.
-- SQLite types, because D1 is SQLite.
create table if not exists contact_messages (
  id integer primary key autoincrement,
  name text not null,
  email text not null,
  company text,
  project_type text not null,
  message text not null,
  created_at text not null default (datetime('now'))
);

-- Newest first is the only order the inbox reads, and it is the order the
-- index serves.
create index if not exists contact_messages_created_at
  on contact_messages (created_at desc);

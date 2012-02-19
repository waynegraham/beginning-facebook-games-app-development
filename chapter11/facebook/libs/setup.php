<?php

require_once('db_manager.php');

$db = new DB_Manager();
/*
$sql = <<<'SQL'

DROP TABLE IF EXISTS puzzle_tracker;

CREATE TABLE puzzle_tracker
(
  id serial NOT NULL, -- auto-incremented id
  uid bigint, -- Facebook user id
  level integer, -- level completed
  completion_time int, -- time taken to complete puzzle
  date_added timestamp with time zone DEFAULT now(),
  CONSTRAINT id PRIMARY KEY (id)
);

CREATE INDEX puzzle_tracker_uid_idx
  ON puzzle_tracker USING btree (uid);
SQL;

$add_table = $db->query($sql);
 */

$query = "SELECT relname FROM pg_stat_user_tables WHERE schemaname='public'";
$tables = $db->query($query);

print "<pre>\n";
if (!pg_num_rows($tables)) {
  print("Your connection is working, but your database is empty.\n
    Fret not. This is expected for new apps.\n");
} else {
  print "Tables in your database:\n";
  while ($row = pg_fetch_row($tables)) { print("- $row[0]\n"); }
}
print "\n";

$db->close();

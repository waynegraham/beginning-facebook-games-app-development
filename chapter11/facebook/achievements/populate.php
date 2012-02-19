<?php

require_once('../libs/db_manager.php');

$setup = <<<SQL
CREATE TABLE achievements
(
  id serial NOT NULL,
  title character varying(50),
  description character varying(255),
  image character varying(50),
  points integer,
  CONSTRAINT primary_key PRIMARY KEY (id)
);
SQL;

$easy = <<<SQL
INSERT INTO achievements(title, description, image, points)
VALUES(
  'Easy Mode Complete',
  'Finish an image puzzle on easy mode',
  '/images/achievements/easy.png',
  10
);
SQL;

$medium = <<<SQL
INSERT INTO achievements(title, description, image, points)
VALUES(
  'Intermediate Mode Complete',
  'Finish an image puzzle on intermediate mode',
  '/images/achievements/intermediate.png',
  20
);
SQL;

$hard = <<<SQL
INSERT INTO achievements(title, description, image, points)
VALUES(
  'Hard Mode Complete',
  'Finish an image puzzle on hard mode',
  '/images/achievements/hard.png',
  30
);
SQL;

$db = new DB_Manager();

$db->query("DROP TABLE IF EXISTS achievements;");

$db->query($setup);
$db->query($easy);
$db->query($medium);
$db->query($hard);

$records = "SELECT * FROM achievements";
$results = $db->query($records);

echo '<pre>';
while($row = pg_fetch_array($results)) {
  print_r($row);
}
echo '</pre>';


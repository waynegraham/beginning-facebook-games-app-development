<?php

class DB_Manager
{
  var $dbconn;

  function __construct()
  {
    $this->dbconn = pg_connect(self::pg_connection_string_from_database_url());
  }

  function pg_connection_string_from_database_url()
  {
    extract(parse_url($_ENV["DATABASE_URL"]));
    $db = substr($path, 1);
    return "user=$user password=$pass host=$host sslmode=require dbname=" . $db;
  }

  function open()
  {
    $this->dbconn = pg_pconnect(
      "host=$host port=$port dbname=$dbname user=$user password=$password"
    );
  }

  function close()
  {
    return pg_close($this->dbconn);
  }

  function query($sql)
  {
    return pg_query($this->dbconn, $sql);
  }

  function numrows($query)
  {
    return pg_numrows($query);
  }

  function fetch_array($query, $row = NULL)
  {
    return pg_fetch_array($query, $row);
  }

  function fetch_object($query, $row = NULL)
  {
    return pg_fetch_object($query, $row);
  }
}

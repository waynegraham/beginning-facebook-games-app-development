<?php

require_once("libs/db_manager.php");

$db = new DB_Manager();

$high_scores = <<<SQL
  SELECT * FROM puzzle_tracker ORDER BY completion_time LIMIT 10;
SQL;

$time_query = <<<SQL
SELECT avg(completion_time) as average,
  min(completion_time) as min,
  max(completion_time) as max
FROM puzzle_tracker;
SQL;

$high_scores_result = $db->query($high_scores);
$time_result = $db->query($time_query);
$time = $db->fetch_array($time_result);

$counter = 1;

$db->close();

function format_milliseconds($ms)
{
  $minutes = floor($ms / 60000);
  $seconds = floor(($ms % 60000) / 1000);
  $milliseconds = str_pad(floor($ms % 1000), 3, '0', STR_PAD_LEFT);
  return $minutes . ':' . $seconds . '.' . $milliseconds;
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">

    <title>Image Puzzle Hall of Fame</title>

    <link rel="stylesheet" href="stylesheets/screen.css" media="screen">

  </head>
  <body>
    <h1>Image Puzzle Hall of Fame</h1>

    <ul>
      <li>
        <strong>Average Time:</strong>
        <?php echo format_milliseconds($time['average']); ?>
      </li>
      <li>
          <strong>Fastest Time:</strong>
          <?php echo format_milliseconds($time['min']); ?>
      </li>
      <li>
          <strong>Slowest Time:</strong>
          <?php echo format_milliseconds($time['max']); ?>
      </li>
    </ul>

    <table>
      <tr>
        <th>Rank</th>
        <th>Time Taken</th>
        <th>Level</th>
        <th>Player</th>
      </tr>
      <?php while($row = pg_fetch_array($high_scores_result)): ?>
        <tr>
        <td><?php echo $counter ?></td>
          <td><?php echo format_milliseconds($row['completion_time']);?></td>
          <td><?php echo $row['level']; ?></td>
          <td>
            <img src="http://graph.facebook.com/<?php echo $row['uid']; ?>/picture?type=small">
          </td>
          </tr><?php $counter++; ?>
      <?php endwhile; ?>
    </table>
  </body>
</html>


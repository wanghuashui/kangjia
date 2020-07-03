<?php
    $db=mysqli_connect("localhost","root","","kanjia");
    if (!$db) {
        die('连接错误: ' . mysqli_error($db));
      }
?>
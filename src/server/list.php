<?php
header("Content-Type:text/html;charset-utf-8");
include_once "./connectDB.php";
$sql="SELECT * FROM goods";
mysqli_query($db,"SET NAMES utf8");
$r=mysqli_query($db,$sql);
$data=mysqli_fetch_all($r,MYSQLI_ASSOC);
echo json_encode($data,true)
?>
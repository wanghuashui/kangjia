<?php
header("Content-Type:text/html;charset-utf-8");
include_once "./connectDB.php";
$id=$_REQUEST["id"];
$sql="SELECT * FROM cart WHERE userid=$id";
mysqli_query($db,"SET NAMES utf8");
$r=mysqli_query($db,$sql);
$data=mysqli_fetch_all($r,MYSQLI_ASSOC);
echo json_encode($data,true)
?>
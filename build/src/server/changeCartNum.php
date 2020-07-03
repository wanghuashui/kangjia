<?php
include_once "./connectDB.php";
$num=$_REQUEST["num"];
$cartid=$_REQUEST["cartid"];
$sql="UPDATE cart SET num=$num WHERE cartid=$cartid";
$r=mysqli_query($db,$sql);
if(!$r){
    echo "更新失败";
}
?>
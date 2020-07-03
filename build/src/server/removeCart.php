<?php
include_once "./connectDB.php";
$cartid=$_REQUEST["cartid"];
$sql="DELETE FROM cart WHERE cartid=$cartid";
$r=mysqli_query($db,$sql);
if(!$r){
    echo "删除失败";
}
?>
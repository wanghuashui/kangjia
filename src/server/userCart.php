<?php
header("Content-Type:text/html;charset-utf-8");
include_once "./connectDB.php";
$userid=$_REQUEST["userid"];
$sql="SELECT cart.*,goods.* FROM cart , goods WHERE cart.goodsid = goods.id AND userid=$userid ORDER BY id";
mysqli_query($db,"SET NAMES utf8");
$r=mysqli_query($db,$sql);
$data=mysqli_fetch_all($r,MYSQLI_ASSOC);
echo json_encode($data,true)
?>
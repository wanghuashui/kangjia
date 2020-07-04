<?php
header("Content-Type:text/html;charset-utf-8");
include_once "./connectDB.php";
$goodsid=$_REQUEST["goodsid"];
$userid=$_REQUEST["userid"];
$sql="SELECT * FROM cart WHERE userid=$userid && goodsid=$goodsid";
$r=mysqli_query($db,$sql);
if(mysqli_num_rows($r)==1){
    if(!isset($_REQUEST["num"])){
        $sql="UPDATE cart SET num=num+1 WHERE userid=$userid && goodsid=$goodsid";
    }else{
        $num=$_REQUEST["num"];
        $sql="UPDATE cart SET num=num+$num WHERE userid=$userid && goodsid=$goodsid";
    }
}else{
    $sql="INSERT INTO cart (cartid,userid,goodsid,num) VALUES (NULL,$userid,$goodsid,1)";
}
$retval = mysqli_query($db,$sql);

if (!$retval) {
  die('添加到购物车失败: ' . mysqli_error($db));
}
echo "添加成功";
?>
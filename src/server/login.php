<?php
include_once "./connectDB.php";
// 获取数据
$phone=$_REQUEST["phone"];
$pwd=$_REQUEST["password"];
$sql="SELECT * FROM user WHERE phonenum='$phone'";
$r=mysqli_query($db,$sql);
if(mysqli_num_rows($r)==1){
    $data=mysqli_fetch_all($r,MYSQLI_ASSOC);
    if($data[0]["password"]==$pwd){
      echo '{"status":"success",'.'"username":"'.$data[0]["username"].'","userid":"'.$data[0]["userid"].'"}';
    }else{
    echo '{"status":"error","msg":"密码错误"}'.$data[0]["password"];
    }
}else{
    echo '{"status":"error","msg":"该手机号未注册，请先注册"}';
}
?>
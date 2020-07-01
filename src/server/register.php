<?php
include_once "./connectDB.php";
// 获取数据
$user=$_REQUEST["username"];
$phone=$_REQUEST["phone"];
$pwd=$_REQUEST["password"];
$sql="SELECT * FROM user WHERE phonenum='$phone'";
$r=mysqli_query($db,$sql);
if(mysqli_num_rows($r)==1){
    echo '{"status":"error","msg":"该手机号已被注册，请重新填写注册的手机号!!"}';
}else{
    $sql="INSERT INTO user (userid,username,phonenum,password) VALUES (NULL,'$user','$phone','$pwd')";
    $retval = mysqli_query($db, $sql);
    if (!$retval) {
      die('无法插入数据: ' . mysqli_error($db));
    }
    echo '{"status":"success"}';
}
?>
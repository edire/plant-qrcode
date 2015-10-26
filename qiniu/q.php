<?php
header("Access-Control-Allow-Origin: *");
require_once("qiniu/rs.php");

$bucket = 'plants';
$accessKey = '3ZF-kJo9H1QoJGdjEfP2Z9EzWfFaOwbtQhXfxJQ6';
$secretKey = '6_iroIUm5fLuRqTvIPYpQLjZ5cssg2FtmGrN1gJr';

Qiniu_SetKeys($accessKey, $secretKey);
$putPolicy = new Qiniu_RS_PutPolicy($bucket);
$upToken = $putPolicy->Token(null);
$arr=array(
        "uptoken"=>$upToken,
        );

print_r(json_encode($arr));

<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {

    public function returnAjax($arr, $msg, $code){
        $result['code'] = $code;
        $result['msg'] = $msg;
        if ($arr && is_array($arr) && count($arr) > 0) {
            $result['data'] = $arr;
        }
        $this->ajaxReturn($result);
    }
    public function getOne ()
    {
        $id = I('get.id');
        $result = M('plant')->where('id='.$id)->select();
        if (!$result) {
            $this->returnAjax(null, '详情获取失败', -1);
            return;
        }
        $this->returnAjax($result[0], '获取成功', 0);
    }
}
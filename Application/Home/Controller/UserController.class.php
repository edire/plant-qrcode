<?php
namespace Home\Controller;
use Think\Controller;
class UserController extends Controller {
    public function returnAjax($arr, $msg, $code){
        $result['code'] = $code;
        $result['msg'] = $msg;
        if ($arr && is_array($arr) && count($arr) > 0) {
            $result['data'] = $arr;
        }
        $this->ajaxReturn($result);
    }

    public function auth () {
        $username = I('post.username');
        $password = md5(I('post.password'));
        $userModel = M('User');
        $condition = array('username' => $username);
        $userInfo = $userModel->where($condition)->find();
        if ($userInfo['password'] != $password) {
            $this->returnAjax(null, '用户名或密码错误', -1);
            return;
        }
        session('userInfo', $userInfo);
        $this->returnAjax(null, '登陆成功', 0);
    }
    public function logout()
    {
        header("Access-Control-Allow-Origin: *");
        session('userInfo', null);
        $this->returnAjax(null, '退出成功', 0);
    }
}
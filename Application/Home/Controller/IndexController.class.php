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
    public function getImg() {
        $url = I('get.url');
        header('content-type: image/png'); 
        echo file_get_contents(urldecode($url));
    }
    public function getOne ()
    {
        $id = I('get.id');
        $plantModel = M('plant');
        $result = $plantModel->where('id='.$id)->select();
        $sid = $result[0]['sid'];
        $gtMap['sid'] = array('gt', $sid);
        $gt = $plantModel -> where($gtMap) -> order('sid') -> find();
        if ($gt)
        {
            $gtName = $gt['name'];
        }
        $ltMap['sid'] = array('lt', $sid);
        $lt = $plantModel -> where($ltMap) -> order('sid desc') -> find();
        if ($lt)
        {
            $ltName = $lt['name'];
        }

        if (!$result) {
            $this->returnAjax(null, '详情获取失败', -1);
            return;
        }
        $res['dataList'] = $result[0];
        $res['round'] = array('prev'=> $ltName, 'next' => $gtName);
        $this->returnAjax($res, '获取成功', 0);
    }
    
    public function search()
    {
        $key = I('get.key');
        $plantModel = M('plant');
        $condition['name|sid|alias|genera|flowerfruit|distribution|look|leaf|flower|fruit|effect|eat|feature|stalk'] = array('like', "%$key%");
        $result = $plantModel->where($condition)->select();
        if (!$result) {
            $this->returnAjax(null, '没有搜索到数据', -1);
            return;
        }
        $this->returnAjax($result, '搜索成功', 0);
    }
    public function next()
    {
        $id = I('get.sid');
        $plantModel = M('plant');
        $map['sid'] = array('gt', $id);
        $result = $plantModel -> where($map) -> order('sid') -> find();
        $sid = $result['sid'];
        $gtMap['sid'] = array('gt', $sid);
        $gt = $plantModel -> where($gtMap) -> order('sid') -> find();
        if ($gt)
        {
            $gtName = $gt['name'];
        }
        $ltMap['sid'] = array('lt', $sid);
        $lt = $plantModel -> where($ltMap) -> order('sid desc') -> find();
        if ($lt)
        {
            $ltName = $lt['name'];
        }

        if (!$result) {
            $this->returnAjax(null, '详情获取失败', -1);
            return;
        }
        $res['dataList'] = $result;
        $res['round'] = array('prev'=> $ltName, 'next' => $gtName);
        $this->returnAjax($res, '获取成功', 0);
    }
    public function prev()
    {
        $id = I('get.sid');
        $plantModel = M('plant');
        $map['sid'] = array('lt', $id);
        $result = $plantModel -> where($map) -> order('sid desc') -> find();
        $sid = $result['sid'];
        $gtMap['sid'] = array('gt', $sid);
        $gt = $plantModel -> where($gtMap) -> order('sid') -> find();
        if ($gt)
        {
            $gtName = $gt['name'];
        }
        $ltMap['sid'] = array('lt', $sid);
        $lt = $plantModel -> where($ltMap) -> order('sid desc') -> find();
        if ($lt)
        {
            $ltName = $lt['name'];
        }
        if (!$result) {
            $this->returnAjax(null, '详情获取失败', -1);
            return;
        }
        $res['dataList'] = $result;
        $res['round'] = array('prev'=> $ltName, 'next' => $gtName);
        $this->returnAjax($res, '获取成功', 0);
    }
    public function listPlant () {
        $pageSize = I('get.pageSize');
        $pageNum = I('get.pageNum');
        $type = I('get.type');
        $plantModel = M('plant');
        if ($type == 1) {
            $dataList = $plantModel -> limit($pageSize) -> page($pageNum) -> order('id desc') -> select();
        } else {
            $dataList = $plantModel -> limit($pageSize) -> page($pageNum) -> order('convert(name using gbk)') -> select();
        }
        if (!$dataList) {
            $this->returnAjax(null, '没有内容', -1);
            return;
        }

        $count = $plantModel -> count();
        $total = ceil($count / $pageSize);
        $result = array(
            'data'=> array(
                'pageSize'=> intval($pageSize, 10),
                'pageNum'=> intval($pageNum, 10),
                'total'=> $total
            ),
            'dataList'=> $dataList
        );
        $this->returnAjax($result, '获取成功', 0);
    }
}
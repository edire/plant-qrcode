<?php
namespace Home\Controller;
use Think\Controller;
class AdminController extends Controller {
    public function __construct(){
        parent::__construct();
        if (!session('userInfo')) {
            $this->returnAjax(null, '没有登陆，请登陆', -2);
        }
    }
    public function returnAjax($arr, $msg, $code){
        $result['code'] = $code;
        $result['msg'] = $msg;
        if ($arr && is_array($arr) && count($arr) > 0) {
            $result['data'] = $arr;
        }
        $this->ajaxReturn($result);
    }
    public function createPlant() {
        $post = I('post.');
        $result = M('plant')->add($post);
        if (!$result) {
            $this->returnAjax(null, '添加失败', -1);
            return;
        }
        $this->returnAjax(array('id' => $result), '添加成功', 0);
    }
    public function deletePlant() {
        $id = I('post.id');
        $result = M('plant')->where('id='.$id)->delete();
        if (!$result) {
            $this->returnAjax(null, '删除失败', -1);
            return;
        }
        $this->returnAjax(null, '删除成功', 0);

    }
    public function search()
    {
        $key = I('get.key');
        $plantModel = M('plant');
        $condition['name|alias|genera|flowerfruit|distribution|look|leaf|flower|fruit|effect|eat|feature|stalk'] = array('like', "%$key%");
        $result = $plantModel->where($condition)->select();
        if (!$result) {
            $this->returnAjax(null, '没有搜索到数据', -1);
            return;
        }
        $this->returnAjax($result, '搜索成功', 0);
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
    public function changePlan ()
    {
        $arr = I('post.');
        $id = $arr['id'];
        unset($arr['id']);
        $result = M('plant')->where('id='.$id)->save($arr);
        if (!$result) {
            $this->returnAjax(null, '保存失败', -1);
            return;
        }
        $this->returnAjax($result[0], '保存成功', 0);
    }
    public function uploadImg ()
    {
        if ((($_FILES["file"]["type"] == "image/gif")
        || ($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/pjpeg")
        || ($_FILES["file"]["type"] == "image/png"))
        && ($_FILES["file"]["size"] < 10000000))
          {
            $name = time().rand();
            switch ($_FILES["file"]["type"]) {
                case 'image/gif':
                    $fullName = $name.'.gif';
                    break;
                case 'image/jpeg':
                    $fullName = $name.'.jpg';
                    break;
                case 'image/pjpeg':
                    $fullName = $name.'.jpg';
                    break;
                case 'image/png':
                    $fullName = $name.'.png';
                    break;
            }
            $a = move_uploaded_file($_FILES["file"]["tmp_name"],
                                UPLOAD_PATH . $fullName);
            if ($a){
                $result = array('name'=> $fullName);
                $this->returnAjax($result, '保存成功', 0);
            } else {
                $this->returnAjax(null, '文件保存失败', -1);
            }
          } else {
            $this->returnAjax(null, '文件格式 gif/jpg/png 小于10M', -1);
          }

        if(!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        }else{// 上传成功
            var_dump($info);
            $this->success('上传成功！');
        }
        $this->returnAjax(null, '保存成功', 0);
        
    }
}
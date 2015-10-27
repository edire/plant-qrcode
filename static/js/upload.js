var uptoken;
$.ajax({
    url: app.root + '/qiniu/q.php',
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
        uptoken = data.uptoken;
    }
})
function qiniuUpload (button, FilesAdded, UploadProgress, FileUploaded, Key) {
    var qiniu = new QiniuJsSDK();
    var uploader = qiniu.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: button,       //上传选择的点选按钮，**必需**
        // uptoken_url: 'http://zhiwu.lysjjd.com/qiniu/q.php',
            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        uptoken : uptoken,
            //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        //unique_names: true,
            // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
        save_key: false,
            // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
        domain: app.qiniu + '/',
            //bucket 域名，下载资源时用到，**必需**
        //container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '10m',           //最大文件体积限制
        flash_swf_url: '../plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 1,                   //上传失败最大重试次数
        dragdrop: false,                   //开启可拖曳上传
        drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '10mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FilesAdded': function(up, file) {
                if (FilesAdded instanceof Function) {
                    FilesAdded(up, file);
                }
            },
            'BeforeUpload': function(up, file) {
            },
            'UploadProgress': function(up, file) {
                if (UploadProgress instanceof Function) {
                    UploadProgress(up, file, button);
                }
            },
            'FileUploaded': function(up, file, info) {
                if (FileUploaded instanceof Function) {
                    FileUploaded(up, file, info, button);
                }
            },
            'Error': function(up, err, errTip) {
            },
            'UploadComplete': function() {
            },
            'Key': function(up, file) {
                if (Key instanceof Function) {
                    return Key(up, file);
                }
            }
        }
    });

}

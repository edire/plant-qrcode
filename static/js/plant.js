define(function(require, exports, module) {
    var view = require('view');
    var _pri = {
        bindUI: function () {
            $('.js-search-btn').on('click', function () {
                var key = $('.js-search-input').val().trim();
                location.href="index.html?key=" + key;
            });
        },
        conf: {
        },
        util:{
            getDate: function () {
                _pri.conf.id = _pri.util.getQuery('pid');
                if (!_pri.conf.id) {
                    alert('缺少参数');
                    return;
                }
                $.ajax({
                    url: app.root + '/qrcode.php?m=home&c=index&a=getOne',
                    type: 'get',
                    data: {
                        id: _pri.conf.id
                    },
                    dataType: 'json',
                    success: function (data) {
                        _pri.util.setTitle(data.data.name);
                        if (data.code == 0) {
                            _pri.util.render(data.data);
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function () {
                        alert('刷新重试');
                    }
                });
            },
            render: function (data) {
                $('.plant-info').empty().html(_.template(view.plantInfo.join(''))({data:data}));
            },
            getQuery: function (name) {
                var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
                if(result == null || result.length < 1){
                    return "";
                }
                return result[1];
            },
            setTitle: function (title) {
                var $body = $('body');
                document.title = title;
                // hack在微信等webview中无法修改document title情况
                var $iframe = $('<iframe src="./src/css/img/campus.ico" style="visibility: hidden;"></iframe>');
                $iframe.on('load',function() {
                    setTimeout(function() {
                        $iframe.off('load').remove();
                    }, 0);
                }).appendTo($body);
            }
        }

    }

    _pri.util.getDate();
    _pri.bindUI();
    

});
    
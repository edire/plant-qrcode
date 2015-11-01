define(function(require, exports, module) {
    var view = require('view');
    var _pri = {
        bindUI: function () {
            $('.js-search-btn').on('click', function () {
                var key = $('.js-search-input').val().trim();
                location.href="index.html?key=" + key;
            });
            $('.js-get-next').on('click', function () {
                _pri.util.getNext();
            });
            $('.js-get-prev').on('click', function () {
                _pri.util.getPrev();
            });
        },
        conf: {
            id: null,
            plant: null
        },
        util:{
            getDate: function () {
                $('.plant-info').html(_.template(view.loading.join(''))({}));
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
                        if (data.code == 0) {
                            _pri.util.render(data.data);
                            _pri.conf.plant = data.data.dataList;
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function () {
                        alert('刷新重试');
                    },
                    complete: function  () {
                        $('.js-loading-placeholder-wrap').remove();
                    }
                });
            },
            render: function (data) {
                _pri.util.setTitle(data.dataList.name);
                $('.plant-info').empty().html(_.template(view.plantInfo.join(''))({data:data.dataList}));
                var left = data.round.prev ? '('+data.round.prev+')' : '';
                var right = data.round.next ? '('+data.round.next+')' : '';
                if (left) {
                    $('.js-get-prev').show()
                } else {
                    $('.js-get-prev').hide()

                }
                if (right) {
                    $('.js-get-next').show()
                } else {
                    $('.js-get-next').hide()
                }
                $('.js-get-prev span').empty().html(left);
                $('.js-get-next span').empty().html(right);
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
            },
            getNext: function () {
                $('.plant-info').html(_.template(view.loading.join(''))({}));
                $.ajax({
                    url: app.root + '/qrcode.php?m=home&c=index&a=next',
                    type: 'get',
                    data: {
                        sid: _pri.conf.plant.sid
                    },
                    dataType: 'json',
                    success: function (resp) {
                        if (resp.code == 0) {
                            history.pushState(null,null,'?pid='+resp.data.dataList.id);
                            _pri.conf.id = resp.data.dataList.id;
                            _pri.util.render(resp.data);
                            _pri.conf.plant = resp.data.dataList;

                        } else {
                            $('.plant-info').empty().text('没有数据喽~');
                            alert(resp.msg);
                        }
                        
                    },
                    error: function () {
                        $('.plant-info').empty().text('服务器错误刷新重试~');
                        alert('服务器错误，请联系管理员！');
                    }
                });
            },
            getPrev: function () {
                $('.plant-info').html(_.template(view.loading.join(''))({}));
                $.ajax({
                    url: app.root + '/qrcode.php?m=home&c=index&a=prev',
                    type: 'get',
                    data: {
                        sid: _pri.conf.plant.sid
                    },
                    dataType: 'json',
                    success: function (resp) {
                        if (resp.code == 0) {
                            history.pushState(null,null,'?pid='+resp.data.dataList.id);
                            _pri.conf.id = resp.data.dataList.id;
                            _pri.util.render(resp.data);
                            _pri.conf.plant = resp.data.dataList;

                        } else {
                            $('.plant-info').empty().text('没有数据喽~');
                            alert(resp.msg);
                        }
                        
                    },
                    error: function () {
                        $('.plant-info').empty().text('服务器错误刷新重试~');
                        alert('服务器错误，请联系管理员！');
                    }
                });
            }
        }

    }

    _pri.util.getDate();
    _pri.bindUI();
    

});
    
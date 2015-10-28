define(function(require, exports, module) {
    var tmpl = require('view');
    var _pri = {
        bindUI: function () {
            
        },
        conf: {
            pageSize: 20,
            pageNum: 1
        },
        util: {
            getList: function(pageNum, pageSize, success) {
                var param = {
                    pageNum: pageNum || _pri.conf.pageNum,
                    pageSize: pageSize || _pri.conf.pageSize,
                    type: 1
                }
                $.ajax({
                    url: app.root + '/qrcode.php?m=home&c=admin&a=listPlant',
                    type: 'get',
                    data: param,
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 0) {
                            _pri.util.renderList(data.data.dataList);
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function () {
                        alert('服务器错误~');
                    }
                });
            },
            search: function (key) {
                $('.js-list-pager').empty();
                if (!$('.js-search-input').val()) {
                    initList();
                    return;
                }
                $.ajax({
                    url: app.root + '/qrcode.php?m=home&c=admin&a=search',
                    type: 'get',
                    data: {
                        key: $('.js-search-input').val()
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 0) {
                            _pri.util.renderList(data.data);
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function () {
                        alert('服务器错误~');
                    }
                });
            },
            renderList: function (data) {
                var html = _.template(tmpl.plantList.join(''))({data:data});
                $('.js-list-box').append($(html));
            }
        }
    };

    var _pub = {
        getList: _pri.util.getList,
        search: _pri.util.search
    }

    module.exports = _pub;
});

define(function(require, exports, module) {
    var view = require('view');
    var _pri = {
        bindUI: function () {
            $('.load-more').on('click', function () {
                _pri.util.getList();
            });
            $('.js-search-btn').on('click', function () {
                var key = $('.js-search-input').val().trim();
                _pri.util.search(key);
            });
            $('.js-list-box').on('click', '.search-back', function () {
                _pri.util.initList();
            })
        },
        conf: {
            pageSize: 20,
            currentPage: 1
        },
        util: {
            getList: function(pageNum, pageSize, success) {
                var param = {
                    pageNum: pageNum || _pri.conf.currentPage,
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
                            if (data.data.data.total === _pri.conf.currentPage) {
                                $('.load-more').hide();
                            } else {
                                $('.load-more').show();
                            }
                            _pri.conf.currentPage ++;
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
                $('.js-list-box').html(_.template(view.loading.join(''))({}));
                if (!key) {
                    _pri.util.initList();
                    return;
                }
                $.ajax({
                    url: app.root + '/qrcode.php?m=home&c=admin&a=search',
                    type: 'get',
                    data: {
                        key: key
                    },
                    dataType: 'json',
                    success: function (data) {
                        $('.js-list-box').empty();
                        if (data.code == 0) {
                            $('.js-list-box').append('<button class="search-back btn btn-info fixed-search-back">返回</button>')
                            _pri.util.renderList(data.data, true);
                        } else {
                            $('.js-list-box').html('<p class="no-search text-danger">没有搜索导数据。<button class="search-back btn btn-default">返回</button></p>')
                        }
                    },
                    error: function () {
                        alert('服务器错误~');
                    }
                });
            },
            renderList: function (data) {
                $('.js-loading-placeholder-wrap').remove();
                var html = _.template(view.plantList.join(''))({data:data});
                $('.js-list-box').append($(html));
                
            },
            initList: function () {
                $('.js-list-box').empty();
                _pri.conf.currentPage = 1;
                _pri.util.getList();
            }
        }
    };
    _pri.bindUI();

    var _pub = {
        getList: _pri.util.getList,
        search: _pri.util.search
    }

    module.exports = _pub;
});

(function () {

app.beforeLogin = false;
$.ajax({
        url: app.root + '/qrcode.php?m=home&c=user&a=isLogin',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.code != 0) {
                app.beforeLogin = true;
                $('#loginModal').modal();
            }
        },
        error: function () {
            alert('出现错误，请联系管理员');
        }
});



var navigation = responsiveNav("foo", {customToggle: ".nav-toggle"});

app.currentChange = 0;


$('.js-info-list').on('click', '.js-change-btn', function () {
    $('.js-change-plant-form').get(0).reset()
    $('#changeModal').modal();
    var dom = $(this).closest('.list-item');
    var id =dom.attr('data-id');
    $.ajax({
        url: app.root + '/qrcode.php?m=home&c=admin&a=getOne',
        type: 'get',
        data: {
            id: id
        },
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                setForm(data.data);
                app.currentChange = data.data.id;
            } else if(data.code == -2) {
                $('#loginModal').modal();
            } else {
                alert(data.msg);
            }
        }
    });
});

$('.js-submit-new').on('click', function () {
    var title = $('#addModal').find('input[name="name"]').val().trim();
    if (!title) {
        alert('请填写名称');
        return;
    }
    $.ajax({
        url: app.root + '/qrcode.php?m=home&c=admin&a=createPlant',
        type: 'post',
        data: $('.js-new-plant-form').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                alert('成功');
            } else if(data.code == -2) {
                $('#loginModal').modal();
            } else {
                alert(data.msg);
            }
        }
    });
})
$('input[name="password"]').on('keydown', function (e) {
    if (e.keyCode === 13) {
        $('.js-login-submit').trigger('click');
    }
})
$('.js-login-submit').on('click', function () {
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();

    $.ajax({
        url: app.root + '/qrcode.php?m=home&c=user&a=auth',
        type: 'post',
        data: {
            username: username,
            password: password
        },
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                $('#loginModal').modal('hide');
                if (app.beforeLogin) {
                    location.reload();
                }
            } else {
                alert(data.msg);
            }
        },
        error: function () {
            alert('服务器错误~');
        }
    });
});
$('.js-search-input').on('keydown', function (e) {
    if (e.keyCode=== 13) {
        search();
    }
})
$('.js-search-btn').on('click', function () {
    search();
})
$('.js-return-btn').on('click', function () {
    $('.js-search-input').val('');
    initList();
})

$('.info-list').on('click', '.js-delete-btn', function () {
    var dom = $(this).closest('.list-item');
    var id =dom.attr('data-id');
    $.ajax({
        url: app.root + '/qrcode.php?m=home&c=admin&a=deletePlant',
        type: 'post',
        data: {
            id: id
        },
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                dom.fadeOut();
            } else if(data.code == -2) {
                $('#loginModal').modal();
            } else {
                alert(data.msg);
            }
        }
    });
});
$('.info-list').on('click', '.js-code-btn', function () {
    $('.js-qrcode-img').attr('src', '');
    var dom = $(this).closest('.list-item');
    var name = dom.find('.js-name').text();
    var id = dom.attr('data-id');
    var url = 'http://qr.liantu.com/api.php?w=300&text=' + app.root + '/plant.html?pid=' + id;
    $('.js-qrcode-img').attr('src', url);
    $('.js-code-name-box').text(name);
    $('#qrCodeModal').modal();
})
$('.js-change-submit').on('click', function  () {
    
    var title = $('#addModal').find('input[name="name"]').val().trim();
    if (!title) {
        alert('请填写名称');
    }
    $.ajax({
        url: app.root + '/qrcode.php?m=home&c=admin&a=changePlan',
        type: 'post',
        data: $('.js-change-plant-form').serialize()+'&id='+app.currentChange,
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                $('#changeModal').modal('hide');
            } else if(data.code == -2) {
                $('#loginModal').modal();
            } else {
                alert(data.msg);
            }
        }
    });
})

$('#addModal').on('show.bs.modal', function () {
    $('.js-new-plant-form').get(0).reset();
    $('.js-picarea .img').attr('src', '');
})

$(".js-upload-img").click(function(e) {
    var btn = $(this);
    e.preventDefault();
        // 上传方法
        $.upload({
                // 上传地址
                url: app.root + '/qrcode.php?m=home&c=admin&a=uploadImg',
                // 文件域名字
                fileName: 'file',
                // 上传完成后, 返回json, text
                dataType: 'json',
                // 上传之前回调,return true表示可继续上传
                onSend: function(data) {

                    return true;
                },
                onSubmit: function (data) {
                    var file = $(data.target).find('input').get(0).files[0];
                    if (file.size > 10000000) {
                        alert('请上传小于10M的图片');
                        return false;
                    }
                    if (file.type.indexOf('image') == -1) {
                        alert('请上传图片文件 jpg/gif/png');
                        return false;
                    }
                },
                // 上传之后回调
                onComplate: function(data) {
                    if (data && data.code == 0) {
                        var name = data.data.name;
                        btn.closest('.js-picarea').find('.img').attr('src', app.root + '/upload/' + name);
                        btn.closest('.js-picarea').find('.js-img-input').val(name);
                    } else {
                        alert(data.msg);
                        return;
                    }
                }
        });
});

var listModel = {};
listModel.pageSize = 20;

initList();

function initList () {

    listModel.isFirstFetch = true;
    listModel.isFirstGet = true;
    getList (1,listModel.pageSize);

}

function getList (pageNum, pageSize) {
    var param = {
        pageNum: pageNum,
        pageSize: pageSize || 20
    }
    $.ajax({
        url: app.root + '/qrcode.php?m=home&c=admin&a=listPlant',
        type: 'get',
        data: param,
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                renderList(data.data.dataList);
                if(!listModel.isFirstGet) {
                    if(listModel.isFirstFetch) {
                        setPager(data.data.data.total, data.data.data.pageNum - 1, listModel.pageSize);
                    }
                }
            } else if(data.code == -2) {
                $('#loginModal').modal();
            } else {
                alert(data.msg);
            }
        },
        error: function () {
            alert('服务器错误~');
        }
    });
}

function pageTableCallback (index, $elem) {
    getList(index + 1, listModel.pageSize);
}
function renderList(data) {
    listModel.isFirstGet = false;
var list = data;
var html = '';
for (var i =0, len = list.length; i < len; i ++) {
    html +=
                '<li class="row list-item" data-id="'+list[i].id+'">' +
                    '<div class="col-xs-8 js-name">' +
                        list[i].name +
                    '</div>' +
                    '<div class="col-xs-4">' +
                        '<button class="btn btn-default js-code-btn">二维码</button>' +
                        '<button class="btn btn-warning js-change-btn">修改</button>' +
                        '<button class="btn btn-danger js-delete-btn">删除</button>' +
                    '</div>' +
                '</li>';
    $('.js-info-list').empty().append($(html));
}
}
function setPager (total, index, size) {
    listModel.isFirstFetch = false;
    $('.js-list-pager').empty().pagination(+total, {
        num_edge_entries: 1,
        num_display_entries: 4,
        callback: pageTableCallback,
        current_page: index,
        link_to: 'javascript:void(0);',
        prev_text: '<<',
        next_text: '>>',
        ellipse_text: '',
        items_per_page: 1
    });
}
function search () {

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
                renderList(data.data);
            } else if(data.code == -2) {
                $('#loginModal').modal();
            } else {
                alert(data.msg);
            }
        },
        error: function () {
            alert('服务器错误~');
        }
    });
}
function setForm (data) {
    for (var x in data) {
        $('input[name="'+x+'"]').val(data[x]);
        $('textarea[name="'+x+'"]').text(data[x]);
        if (x.indexOf('pic') > -1) {
            $('.'+x).attr('src', app.root+ '/upload/' + data[x]);
        }
    }
}
})();

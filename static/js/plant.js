(function () {
function getQuery(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
}


var id = getQuery('pid');
if (!id) {
    alert('缺少参数');
}

$.ajax({
    url: app.root + '/qrcode.php?m=home&c=index&a=getOne',
    type: 'get',
    data: {
        id: id
    },
    dataType: 'json',
    success: function (data) {
        if (data.code == 0) {
            $('div').html(JSON.stringify(data.data));
        } else {
            alert(data.msg);
        }
    },
    error: function () {
        alert('刷新重试');
    }
});

})();
    
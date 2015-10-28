define(function(require, exports, module) {
    var list = require('list');
    var view = require('view');
    $('.js-list-box').html(_.template(view.loading.join(''))({}));



    var key = (function (name) {
        var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
        if(result == null || result.length < 1){
            return "";
        }
        return result[1];
    })('key');
    if (key) {
        list.search(key);
    } else {
        list.getList();
    }
});
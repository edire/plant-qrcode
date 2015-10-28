define(function(require, exports, module) {
    var tmpl = {
        plantList: [
            '<%_.each(data, function(item){%>',
                '<li class="item col-xs-6">',
                    '<div class="thumbnail">',
                      '<img src="<%=item.pic1%>" class="img-thumbnail">',
                      '<div class="caption">',
                        '<h3><%=item.name%></h3>',
                      '</div>',
                    '</div>',
                '</li>',
            '<%})%>',
        ],
    }
    module.exports = tmpl;
});
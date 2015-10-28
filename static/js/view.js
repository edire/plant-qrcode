define(function(require, exports, module) {
    var tmpl = {
        plantList: [
            '<%_.each(data, function(item){%>',
                '<li class="item col-xs-6">',
                    '<a href="plant.html?pid=<%=item.id%>">',
                        '<div class="thumbnail">',
                            '<div class="img-box">',
                                '<img src="<%=app.qiniu + \"/\" + item.pic1%>" class="img-thumbnail">',
                            '</div>',
                          '<div class="caption">',
                            '<h3><%=item.name%></h3>',
                          '</div>',
                        '</div>',
                    '</a>',
                '</li>',
            '<%})%>',
        ],
        loading: [
            '<div class="loading-placeholder-wrap js-loading-placeholder-wrap">',
                '<div class="campus-spinner">',
                    '<div class="rect1">&nbsp;</div>',
                    '<div class="rect2">&nbsp;</div>',
                    '<div class="rect3">&nbsp;</div>',
                    '<div class="rect4">&nbsp;</div>',
                    '<div class="rect5">&nbsp;</div>',
                '</div>',
            '</div>'
        ],
        plantInfo: [
            '<div class="plant-name mt20 mb10"><%=data.name%></div>',
            '<ul>',
                '<li class="clearfix mb5">',
                    '<img src="<%=data.pic1%>" class="info-image"/>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">别名</div>',
                    '<div class="col-xs-8">',
                    '<%=data.alias%>',
                    '</div>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">属科</div>',
                    '<div class="col-xs-8">',
                    '<%=data.genera%>',
                    '</div>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">花果期</div>',
                    '<div class="col-xs-8">',
                    '<%=data.flowerfruit%>',
                    '</div>',
                '</li>',
                '',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">分布</div>',
                    '<div class="col-xs-8">',
                    '<%=data.distribution%>',
                    '</div>',
                '</li>',
    '',
                '<li class="clearfix mb5">',
                    '<img src="<%=data.pic2%>" class="info-image"/>',
                '</li>',
                '<li class="clearfix mt20 mb10">',
                    '<h6 class="col-xs-4">识别要点</h6>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">外观</div>',
                    '<div class="col-xs-8">',
                    '<%=data.look%>',
                    '</div>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">茎</div>',
                    '<div class="col-xs-8">',
                    '<%=data.stalk%>',
                    '</div>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">叶</div>',
                    '<div class="col-xs-8">',
                    '<%=data.leaf%>',
                    '</div>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">花</div>',
                    '<div class="col-xs-8">',
                    '<%=data.flower%>',
                    '</div>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">果</div>',
                    '<div class="col-xs-8">',
                    '<%=data.fruit%>',
                    '</div>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">植物功效</div>',
                    '<div class="col-xs-8">',
                    '<%=data.effect%>',
                    '</div>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">食用价值</div>',
                    '<div class="col-xs-8">',
                    '<%=data.eat%>',
                    '</div>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<div class="col-xs-4">习性特征</div>',
                    '<div class="col-xs-8">',
                    '<%=data.feature%>',
                    '</div>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<img src="<%=data.pic3%>" class="info-image"/>',
                '</li>',
                '<li class="clearfix mb5">',
                    '<img src="<%=data.pic4%>" class="info-image"/>',
                '</li>',
            '</ul>'
        ]
    }
    module.exports = tmpl;
});
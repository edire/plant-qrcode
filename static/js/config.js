
var app = {};

var root = location.origin;
if (root.indexOf('127.0.0.1') > -1) {
    app.root = 'http://127.0.0.1/qrcode';
} else {
    app.root = root;
}

app.qiniu = 'http://plantarc.fanmingfei.com';

"use strict";
var _slicedToArray = (function() {
    function b(c, d) {
      var e = [],
        f = !0,
        g = !1,
        h = void 0;
      try {
        for (
          var l, k = c[Symbol.iterator]();
          !(f = (l = k.next()).done) &&
          (e.push(l.value), !(d && e.length === d));
          f = !0
        );
      } catch (m) {
        (g = !0), (h = m);
      } finally {
        try {
          !f && k["return"] && k["return"]();
        } finally {
          if (g) throw h;
        }
      }
      return e;
    }
    return function(c, d) {
      if (Array.isArray(c)) return c;
      if (Symbol.iterator in Object(c)) return b(c, d);
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    };
  })(),
  canvas = document.createElement("canvas"),
  context = canvas.getContext("2d");
(canvas.width = 600), (canvas.height = 400);
function draw(_ref) {
  var b = _ref.name,
    c = _ref.anothername,
    d = _ref.family,
    e = _ref.florescence,
    f = _ref.fruiting,
    g = _ref.genus,
    h = _ref.submit,
    k = _ref.id;
  return new Promise(function(l) {
    context.clearRect(0, 0, 600, 400),
      Promise.all([drawIco(context), drawQRcode(context, k)]).then(function() {
        return l(canvas);
      }),
      (context.fillStyle = "red"),
      (context.textBaseline = "middle"),
      (context.font = "50px STXingKai");
    var m = canvas.width / 2 - 50 * b.length / 2;
    context.fillText(b, m, 70), fillText(context, c, d, e);
  });
}
function drawIco(b) {
  return new Promise(function(c) {
    var d = new Image();
    (d.src = "1.png"),
      (b.font = "14px STXingKai"),
      b.fillText(
        "\u4E34\u6C82\u4E2D\u5C0F\u5B66\u751F\u7EFC\u5408\u5B9E\u8DF5\u57FA\u5730",
        100,
        360
      ),
      (d.onload = function() {
        b.drawImage(d, 50, 335, 40, 40), c();
      });
  });
}
function drawQRcode(b, c) {
  return new Promise(function(d) {
    var e = new Image();
    (e.crossOrigin = "anonymous"),
      (e.src =
        "http://mobile.qq.com/qrcode?url=http%3A%2F%2Fshijianjidi.fanmingfei.com%2Fplant.html%3Fpid%3D" +
        c),
      (e.onload = function() {
        b.drawImage(e, 20, 20, 160, 160, 440, 220, 140, 140), d();
      });
  });
}
function fillText(b, c, d, e) {
  (b.fillStyle = "black"),
    (b.font = "25px STXingKai"),
    (b.textBaseline = "top");
  var h = [];
  [
    [c, "\u522B  \u540D\uFF1A"],
    [d, "\u5C5E  \u79D1\uFF1A"],
    [e, "\u82B1\u679C\u671F\uFF1A"]
  ].forEach(function(_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      l = _ref3[0],
      m = _ref3[1],
      k = getText(l);
    (k[0] = m + k[0]), (h = h.concat(k));
  }),
    h.forEach(function(k, l) {
      b.fillText(h[l], 40, 130 + l * 40);
    }),
    (b.font = "14px STXingKai"),
    b.fillText("\u626B\u7801\u4E86\u89E3\u66F4\u591A", 460, 360);
}
function getText(b) {
  var c = 280;
  if (context.measureText(b).width < c) return [b];
  for (var d = [], e = 0, f = 0; f < b.length; f++)
    context.measureText(d[e]).width > c && e++,
      d[e] || (d[e] = ""),
      (d[e] += b[f]);
  return d;
}

module.exports = draw
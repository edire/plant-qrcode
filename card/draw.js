var canvas = document.createElement('canvas')
var context = canvas.getContext('2d');
canvas.width = 600
canvas.height = 400

function draw({ name, anothername, family, florescence, fruiting, genus, submit, id }) {
    return new Promise(function(r) {
        context.clearRect(0, 0, 600, 400)

        // context.fillStyle = "#EEEEFF";
        // context.fillRect(0, 0, 1500, 1000);

        Promise.all([drawIco(context), drawQRcode(context, id)]).then(() => r(canvas))



        context.fillStyle = "red";
        context.textBaseline = 'middle';
        context.font = '50px STXingKai';
        var x = canvas.width / 2 - name.length * 50 / 2
        context.fillText(name, x, 70);

        fillText(context, anothername, family, florescence);

    })
}

function drawIco(context) {
    return new Promise(r => {
        var image = new Image();
        image.src = "1.png";

        context.font = '14px STXingKai';
        context.fillText('临沂中小学生综合实践基地', 100, 360)
        image.onload = function() {
            context.drawImage(image, 50, 335, 40, 40);
            r()
        };
    })
}

function drawQRcode(context, id) {
    return new Promise(r => {
        var image = new Image();
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = `http://mobile.qq.com/qrcode?url=http%3A%2F%2Fshijianjidi.fanmingfei.com%2Fplant.html%3Fpid%3D${id}`
        image.onload = function() {
            context.drawImage(image, 20, 20, 160, 160, 440, 220, 140, 140);
            r()
        };
    })
}

function fillText(context, anothername, family, florescence) {
    context.fillStyle = "black";
    context.font = '25px STXingKai';
    context.textBaseline = 'top';

    var lineHeigt = 40

    var arr = [
        [anothername, '别  名：'],
        [family, '属  科：'],
        [florescence, '花果期：']
    ]
    var arr2 = []
    arr.forEach(([text, title]) => {
        var a = getText(text)
        a[0] = title + a[0]
        arr2 = arr2.concat(a)
    })

    arr2.forEach((value, i) => {
        var x = 40 //i ? 130 : 40
        context.fillText(arr2[i], x, 130 + i * lineHeigt)
    })


    context.font = '14px STXingKai';
    context.fillText('扫码了解更多', 460, 360)

}

function getText(text) {
    var width = 280
    if (context.measureText(text).width < width) {
        return [text]
    }
    var arr = []
    var j = 0
    for (var i = 0; i < text.length; i++) {
        if (context.measureText(arr[j]).width > width) {
            j++
        }
        if (!arr[j]) arr[j] = ''
        arr[j] += text[i]
    }
    return arr
}


module.exports = draw
var fs = require('fs')
var data = require('./data').data.dataList
var draw = require('./draw')
var canvasBuffer = require('electron-canvas-to-buffer')


async function aaa() {
    for (let i = 0; i < data.length; i++) {
        const { id, name, alias, genera, flowerfruit } = data[i]
        const canvas = await draw({
            name: name,
            anothername: alias,
            family: genera,
            florescence: flowerfruit,
            fruiting: '',
            genus: '',
            id: id
        })
        // document.body.append(canvas)
        var buffer = canvasBuffer(canvas, 'image/png')
        fs.writeFile(`./images/${id}-${name}.png`, buffer, function(err) {
            console.log(i)
            if (err) console.log(err)
        })
    }

}

aaa()
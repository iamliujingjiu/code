// 入口文件

import '../css/main.css';
require.context('./assets', true, /\.(png|jpe?g|gif)$/i);
let config = require('./config');
let baseImage = require('./baseImage');
let canvas = require('./canvas');
const ID = 'canvas';
window.onload = function main(){
    const bgImg = Object.create(baseImage);
    bgImg.image = new Image();
    bgImg.width = bgImg.height = 0;
    let random = Math.floor(Math.random() * 2);
    debugger
    bgImg.onInit(config.getBgFilePath(random), function success(){
        let width = bgImg.getWidth();
        let height = bgImg.getHeight();
        canvas.onInit(ID, width, height);
        bgImg.onDraw(canvas.getCachemCanvasContext());
        debugger
        canvas.onCopy();
    })

    const landImg = Object.create(baseImage);
    landImg.image = new Image();
    landImg.width = landImg.height = 0;
    landImg.onInit(config.getLandFilePath(), function success(){
        landImg.onDraw(canvas.getCachemCanvasContext());
        canvas.onCopy();
    })

}
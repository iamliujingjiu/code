// 入口文件
'use strict';
require('../style/main.css');
require.context('./assets', true, /\.(png|jpe?g|gif)$/i);

const BgImg = require("./bean/BgImg");

const ID = 'canvas';


let mCanvas = document.getElementById(ID);
let mContext = mCanvas.getContext('2d');
let bg = new BgImg();

window.setTimeout(() => {
    mContext.drawImage(bg.getImg(), 0, 0, 100, 100);
}, 2000)


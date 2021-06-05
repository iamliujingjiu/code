// 入口文件
'use strict';
require('../style/main.css');
require.context('./assets', true, /\.(png|jpe?g|gif)$/i);


const mCanvas = require("./canvas");
const mBg = require("./bg");
const mPipe = require("./pipe");
const mLand = require("./land");
const mBird = require("./bird");

let mIimer = 0;

let angle = -0.4;
window.setTimeout(() => {
    const mBgWidth = mBg.getW();
    const mBgHeight = mBg.getH();
    
    mCanvas.onInit(mBgWidth, mBgHeight);
    mLand.onInit(mBgHeight);
    mPipe.onInit(mBgWidth, mBgHeight, mLand.getLandHeight());
    // mBird.onInit(40, mBgHeight / 2);

    onDraw();
}, 2000)



function onDraw(){
    mIimer += 1;
    angle += 0.005;

    mLand.onMove(-1);
    mPipe.onMove(-1);
    mBird.onMove(1);
    
    mBg.onDraw(mCanvas.getContext());
    mPipe.onDraw(mCanvas.getContext());
    mLand.onDraw(mCanvas.getContext());
    mBird.onDraw(mCanvas.getContext(), mIimer, angle);

    mCanvas.copyCache();

    window.requestAnimationFrame(onDraw);
}

// 入口文件
'use strict';
require('../style/main.css');
require.context('./assets', true, /\.(png|jpe?g|gif)$/i);

const mGameLaunch = require("./page/gameLaunch");
const mGameReady = require("./page/gameReady");
const mGameStart = require("./page/gameStart");
const mGameOver = require("./page/gameOver");

window.setTimeout(() => {
    onLauch();
}, 200)

function onLauch(){
    return mGameLaunch.onCreate(() => {
        onReady();
    });
}

function onReady(){
    return mGameReady.onCreate(() => {
        onStart();
    });
}

function onStart(){
    return mGameStart.onCreate(() => {
        onOver();
    });
}

function onOver(){
    return mGameOver.onCreate(() => {
        onReady();
    });
}

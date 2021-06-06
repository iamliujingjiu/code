// 入口文件
'use strict';
require('../style/main.css');
require.context('./assets', true, /\.(png|jpe?g|gif)$/i);

const mGameLaunch = require("./page/gameLaunch");
const mGameReady = require("./page/gameReady");
const mGameStart = require("./page/gameStart");
const mGameOver = require("./page/gameOver");

window.setTimeout(() => {
    mGameLaunch.onCreate(() => {
        mGameReady.onCreate(() => {
            mGameStart.onCreate(() => {
                mGameOver.onCreate(() => {
                    
                })
            })
        })
    });
}, 2000)

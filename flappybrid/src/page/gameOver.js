const mCanvas = require("../canvas");
const mBg = require("../bg");
const mLand = require("../land");
const mScorePanel = require("../scorePanel");
const mGameOver = require("../gameOver");
const mStartBt = require("../startBt");

let mTimer = 0;

let mAnimationFrame;

let fn;
function onCreate(skipGameReadyCallback){
    const mBgWidth = mBg.getW();
    const mBgHeight = mBg.getH();
    mCanvas.onInit(mBgWidth, mBgHeight);
    mLand.onInit(mBgHeight);
    mScorePanel.onInit(mBgWidth / 2, mBgHeight / 2);
    mGameOver.onInit(mBgWidth / 2, mBgHeight / 4);
    mStartBt.onInit(mBgWidth / 2, mBgHeight * 3 / 4);

    fn = function(event){
        // var x = event.layerX;
        // var y = event.layerY;
        skipGameReadyCallback();
        onDestory();
    }
    mCanvas.addEventListener('click', fn);

    onDraw();
}

function onDraw(){

    mTimer += 1;

    mBg.onDraw(mCanvas.getContext());
    mLand.onDraw(mCanvas.getContext());
    mGameOver.onDraw(mCanvas.getContext());
    mStartBt.onDraw(mCanvas.getContext());
    mScorePanel.onDraw(mCanvas.getContext(), mTimer);

    mCanvas.copyCache();

    mAnimationFrame = window.requestAnimationFrame(onDraw);
}

function onDestory(){
    if(mAnimationFrame){
        window.cancelAnimationFrame(mAnimationFrame);
        mAnimationFrame = null;
    }
    if(fn){
        mCanvas.removeEventListener('click', fn);
    }
}

module.exports = {
    onCreate : onCreate,
    onDestory : onDestory
};
const mCanvas = require("../canvas");
const mBg = require("../bg");
const mLand = require("../land");
const mBird = require("../bird");
const mGetReady = require("../getReady");
const mTutorial = require("../tutorial");

let mTimer = 0;

let mAnimationFrame;

let fn;

function onCreate(skipGameStartCallback){
    
    const mBgWidth = mBg.getW();
    const mBgHeight = mBg.getH();
    mCanvas.onInit(mBgWidth, mBgHeight);
    mLand.onInit(mBgHeight);
    mBird.onInit(40, mBgHeight / 2);
    mGetReady.onInit(mBgWidth / 2, mBgHeight / 4);
    mTutorial.onInit(mBgWidth / 2, mBgHeight / 2);

    fn = function(event){
        // var x = event.layerX;
        // var y = event.layerY;
        skipGameStartCallback();
        onDestory();
    }
    mCanvas.addEventListener('click', fn);

    onDraw();
}

function onDraw(){

    mTimer += 1;

    mBg.onDraw(mCanvas.getContext());
    mLand.onDraw(mCanvas.getContext());
    mGetReady.onDraw(mCanvas.getContext());
    mTutorial.onDraw(mCanvas.getContext());
    mBird.onDraw(mCanvas.getContext(), mTimer);

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
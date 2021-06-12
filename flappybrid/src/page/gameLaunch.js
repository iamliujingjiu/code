const mCanvas = require("../canvas");
const mBg = require("../bg");
const mLand = require("../land");
const mBird = require("../bird");
const mTitle = require("../title");
const mStartBt = require("../startBt");

let mTimer = 0;

let mAnimationFrame;

let fn;
function onCreate(skipGameReadyCallback){
    const mBgWidth = mBg.getW();
    const mBgHeight = mBg.getH();
    mCanvas.onInit(mBgWidth, mBgHeight);
    mLand.onInit(mBgHeight);
    mBird.onInit(mBgWidth / 2, mBgHeight / 2);
    mTitle.onInit(mBgWidth / 2, mBgHeight / 4);
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
    mTitle.onDraw(mCanvas.getContext());
    mStartBt.onDraw(mCanvas.getContext());
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
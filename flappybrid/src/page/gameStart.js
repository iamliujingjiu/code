
const mCanvas = require("../canvas");
const mBg = require("../bg");
const mPipe = require("../pipe");
const mLand = require("../land");
const mBird = require("../bird");
const mScore = require("../score");

let mTimer = 0;

let angle = -0.4;

let score = 0;

let mAnimationFrame;

let isClick = false;

let mSkipGameOverCallback;
function onCreate(skipGameOverCallback){
    mSkipGameOverCallback = skipGameOverCallback;

    const mBgWidth = mBg.getW();
    const mBgHeight = mBg.getH();
    
    mCanvas.onInit(mBgWidth, mBgHeight);
    mLand.onInit(mBgHeight);
    mPipe.onInit(mBgWidth, mBgHeight, mLand.getLandHeight());
    mBird.onInit(40, mBgHeight / 2);
    mScore.onInit(mBgWidth / 2, mBgHeight / 4);

    window.addEventListener('click', () => {
        isClick = true;
    })
    
    onDraw();
}




function onDraw(){
    mTimer += 1;

    mLand.onMove(-1);
    mPipe.onMove(-1, () => {
        score += 1;
    });
    
    if(isClick){
        mBird.onMove(-20);

        angle = -0.4;

        isClick = false;
    }else{
        mBird.onMove(1);

        if(angle < 0.4){
            angle += 0.03;
        }
    }
    
    mBg.onDraw(mCanvas.getContext());
    mPipe.onDraw(mCanvas.getContext());
    mLand.onDraw(mCanvas.getContext());
    mScore.onDraw(mCanvas.getContext(), score);
    mBird.onDraw(mCanvas.getContext(), mTimer, angle);
    
    mCanvas.copyCache();

    mAnimationFrame = window.requestAnimationFrame(onDraw);

    mBird.collisionDetection(mLand.getLandTop(), mPipe.getPipeList(),() => {
        window.cancelAnimationFrame(mAnimationFrame);
        
        mSkipGameOverCallback();
    });

}

function onDestory(){
    if(mSkipGameOverCallback){
        mSkipGameOverCallback = null;
    }
    if(mAnimationFrame){
        window.cancelAnimationFrame(mAnimationFrame);
        mAnimationFrame = null;
    }
}

module.exports = {
    onCreate : onCreate,
    onDestory : onDestory
};
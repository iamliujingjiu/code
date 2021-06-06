const PipeImg = require("./bean/PipeImg");

const mPipe = new PipeImg();

const PIPEINTERVALHEIGHT = 115;//上下管道间隙
const PIPEMINHEIGHT = 80;//管道最小高度值
let PIPEMAXHEIGHT;//管道最大高度值
let PIPEWIDTH = 0;
let PIPEHEIGHT = 0;
let BGWIDTH = 0;

const LENGTH = 3;
const mPipeList = new Array(LENGTH);


function onInit(bgWidth, bgHeight, landY){
    BGWIDTH = bgWidth;
    PIPEWIDTH = mPipe.getW();
    PIPEHEIGHT = mPipe.getH();
    PIPEMAXHEIGHT = bgHeight - landY - PIPEINTERVALHEIGHT - PIPEMINHEIGHT;
    for(let index = 0;index < LENGTH;index++){
        let x = bgWidth + index * bgWidth / 2;
        let downY = Math.random() * (PIPEMAXHEIGHT - PIPEMINHEIGHT) + PIPEMINHEIGHT - PIPEHEIGHT;
        let upY = downY + PIPEHEIGHT + PIPEINTERVALHEIGHT;
        mPipeList[index] = {
            X : x,
            downY : downY,
            upY : upY,
            W : PIPEWIDTH,
            H : PIPEHEIGHT,
        };
    }
}


function onMove(addX, addScoreCallback){

    for(let index = 0;index < LENGTH;index++){
        let item = mPipeList[index];
        item.X += addX;
        if(item.X + item.W <= 0){
            addScoreCallback();
            let x =  LENGTH * BGWIDTH / 2 - PIPEWIDTH;
            let downY =  Math.random() * (PIPEMAXHEIGHT - PIPEMINHEIGHT) + PIPEMINHEIGHT - PIPEHEIGHT;
            let upY = downY + PIPEHEIGHT + PIPEINTERVALHEIGHT;
            item.X = x;
            item.downY = downY;
            item.upY = upY;
            item.W = PIPEWIDTH;
            item.H = PIPEHEIGHT;
            
        }
    }
}


function onDraw(context){
    for(let index = 0;index < LENGTH;index++){
        let item = mPipeList[index];
        context ? context.drawImage(mPipe.getPipeDownImg(), item.X, item.downY, item.W, item.H) : '';
        context ? context.drawImage(mPipe.getPipeUpImg(), item.X, item.upY, item.W, item.H) : '';
    }
}

function getPipeList(){
    return mPipeList;
}

module.exports = {
    onInit : onInit,
    onMove : onMove,
    onDraw : onDraw,
    getPipeList : getPipeList
};
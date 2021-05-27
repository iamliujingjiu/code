// 入口文件
'use strict';
require('../style/main.css');
require.context('./assets', true, /\.(png|jpe?g|gif)$/i);

let config = require('./config/config');
let imgFactory = require('./factory/imgFactory');
let canvas = require('./canvas');

const ID = 'canvas';

let mBgImg, mLandImg, mPipeDownImg, mPipeUpImg, mBirdImgList;

let mLandListLength, mPipeListLength, mBirdImgListLength;
let mLandList, mPipeList;

let bgRandom, bridRandom;

let mLandY = 0;

let mScore = 0;
let mTime = 0;
let mSpeedX = -1,//X轴 飞翔的速度
mSpeedDownY = 1,//Y轴 下落的速度
mSpeedUpY = -30,////Y轴 上升的速度
addUpY = 0;//Y轴一次重绘上升的高度

let mBirdAngle = 0;
let mAnimationFrame;
function initData(){
    bgRandom = Math.floor(Math.random() * 2);
    bridRandom = Math.floor(Math.random() * 3);
    let bgWidth = mBgImg.width;
    let bgHeight = mBgImg.height;
    let landWidth = mLandImg.width;
    let landHeight = mLandImg.height;
    mLandY = bgHeight - landHeight;
    mLandListLength = Math.ceil(2 * bgWidth / landWidth)
    mLandList = new Array(mLandListLength);
    for(let index = 0;index < mLandListLength;index++){
        let x = index * landWidth;
        mLandList[index] = {
            X : x,
            Y : mLandY,
            W : landWidth,
            H : landHeight,
        };
    }
    

    let pipeImgIntervalHeight = 115;//这个可以改动
    let pipeMinHeight = 80;//这个可以改动
    let pipeMaxHeight = mLandY - pipeImgIntervalHeight - pipeMinHeight;
    let pipeImgWidth = mPipeDownImg.width;
    let pipeImgHeight = mPipeDownImg.height;

    mPipeList = new Array(mPipeListLength = 3);
    for(let index = 0;index < mPipeListLength;index++){
        let x = Math.ceil(bgWidth + index * bgWidth / 2);
        let downY = Math.ceil(Math.random() * (pipeMaxHeight - pipeMinHeight) + pipeMinHeight) - pipeImgHeight;
        let upY = downY + pipeImgHeight + pipeImgIntervalHeight;
        mPipeList[index] = {
            X : x,
            downY : downY,
            upY : upY,
            W : pipeImgWidth,
            H : pipeImgHeight,
        };
    }
    
    
    for(let index = 0;index < mBirdImgListLength;index++){
        let birdImg = mBirdImgList[index];
        birdImg.X = 40;
        birdImg.Y = bgHeight / 2;
    }
}

function initView(){
    let promiseList = [];
    let bgFilePath = config.getBgFilePath(bgRandom);
    let landFilePath = config.getLandFilePath();
    let pipeFilePathArr = config.getPipeFilePathArr(bgRandom); 
    let pipeDownFilePath = pipeFilePathArr && pipeFilePathArr[0];
    let pipeUpFilePath = pipeFilePathArr && pipeFilePathArr[1];
    let birdFilePathArr = config.getBirdFilePathArr(bridRandom);
    mBirdImgListLength = birdFilePathArr.length;
    mBirdImgList = new Array(mBirdImgListLength);
    promiseList.push(imgFactory.create(bgFilePath));
    promiseList.push(imgFactory.create(landFilePath));
    promiseList.push(imgFactory.create(pipeDownFilePath));
    promiseList.push(imgFactory.create(pipeUpFilePath));
    for(let index = 0,length = mBirdImgListLength;index < length;index++){
        promiseList.push(imgFactory.create(birdFilePathArr[index]));
    }

    Promise.all(promiseList).then((values) => {
        mBgImg = values[0];
        mLandImg = values[1];
        mPipeDownImg = values[2];
        mPipeUpImg = values[3];
        for(let index = 0,length = mBirdImgListLength;index < length;index++){
            mBirdImgList[index] = values[4 + index];
        }
        canvas.onInit(ID, mBgImg.width, mBgImg.height);   
    }).catch((err) => {
        debugger
    })
    
}


function onDraw(){
    mTime += 1;

    canvas.onDrawImage(mBgImg.image, 0, 0, mBgImg.width, mBgImg.height);

    let pipeImgIntervalHeight = 115;//这个可以改动
    let pipeMinHeight = 80;//这个可以改动
    let pipeMaxHeight = mLandY - pipeImgIntervalHeight - pipeMinHeight;

    for(let i = 0, length = mPipeListLength; i< length; i++){
        let item = mPipeList[i];
        item.X += mSpeedX;
        
        if(item.X + item.W <= 0){
            mScore += 1;
            item.X = mPipeListLength * mBgImg.width / 2 - item.W;
            item.downY = Math.ceil(Math.random() * (pipeMaxHeight - pipeMinHeight) + pipeMinHeight) - item.H;
            item.upY = item.downY + item.H + pipeImgIntervalHeight;
        }

        canvas.onDrawImage(mPipeDownImg.image, item.X, item.downY, item.W, item.H);
        canvas.onDrawImage(mPipeUpImg.image, item.X, item.upY, item.W, item.H);
    }

    
    for(let i = 0, length = mLandListLength; i< length; i++){
        let item = mLandList[i];
        item.X += mSpeedX;
        if(item.X + item.W <= 0){
            item.X = (mLandListLength - 1) * item.W;
        }
        canvas.onDrawImage(mLandImg.image, item.X, item.Y, item.W, item.H);
    }
    
    addUpY += mSpeedDownY;
    
    for(let index = 0;index < mBirdImgListLength;index++){
        let birdImg = mBirdImgList[index];
        birdImg.Y += addUpY;
        collisionDetection(birdImg);
    }
    //复原
    addUpY = 0;

    let index = Math.floor(mTime % 9 / 3);
    let birdImg = mBirdImgList && mBirdImgList[index];
   
    // canvas.mCacheCanvasContext.translate((birdImg.X + birdImg.width) / 2, (birdImg.Y + birdImg.height) / 2);
    // canvas.mCacheCanvasContext.rotate(Math.cos(15));
    // birdImg.image.style.transform = 'rotate(-20deg)';
    // birdImg.image.style.animation = 'up .6s';

    let birdCanvas = document.createElement('canvas');
    let birdContext = birdCanvas && birdCanvas.getContext && birdCanvas.getContext('2d');
    birdCanvas.width = birdImg.width;
    birdCanvas.height = birdImg.height;
    birdContext.translate(birdImg.width / 2, birdImg.height / 2);
    
    birdContext.rotate(mBirdAngle * Math.PI / 180);
    // mBirdAngle !== 90 ? mBirdAngle = 90 : '';  
    birdContext.translate(- birdImg.width / 2, - birdImg.height / 2);
 
    birdContext.drawImage(birdImg.image, 0, 0, birdImg.width, birdImg.height);
    birdImg ? canvas.onDrawImage(birdCanvas, birdImg.X, birdImg.Y, birdImg.width, birdImg.height) : '';


    // canvas.mCacheCanvasContext.translate(0, 0);

    canvas.onCopy();

    mAnimationFrame = window.requestAnimationFrame(onDraw);
}

function onDrawGameOverPage(){
    setTimeout(() => {
        mAnimationFrame && window.cancelAnimationFrame(mAnimationFrame);
    }, 25)
}

function collisionDetection(birdImg){
    let birdL = birdImg.X;
    let birdR = birdImg.X + birdImg.width;
    let birdT = birdImg.Y;
    let birdB = birdImg.Y + birdImg.height;

    //触地
    if(birdB > mLandY){
        onDrawGameOverPage();
    }
    
    //碰撞检测
    for(let index = 0, length = mPipeListLength;index < length;index++){
        let pipeItem = mPipeList[index];
        if((birdL > pipeItem.X && birdL < pipeItem.X + pipeItem.W)
            // 右侧撞到柱子
            || (birdR > pipeItem.X && birdR < pipeItem.X + pipeItem.W)){
            // 鸟右上方的点撞到上方的柱子
            if(birdT > 0 && birdT < pipeItem.H + pipeItem.downY){
                onDrawGameOverPage();
            // 鸟右下方的点撞到下方的柱子 
            }else if(birdB > pipeItem.upY && birdB < mLandY){
                onDrawGameOverPage();
            }
        }
    }
}


window.addEventListener('click', function(){
    addUpY += mSpeedUpY;
    mBirdAngle = -45;
})

window.onload = function main(){
    initView();

    setTimeout(() => {
        initData();

        onDraw();
    }, 3000)
    
    
}
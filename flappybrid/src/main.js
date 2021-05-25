// 入口文件
'use strict'
require.context('../style', true, /\.(css)$/i);
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

let mSpeedX = -1;
let mScore = 0;
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

    canvas.onCopy();

    window.requestAnimationFrame(onDraw);
}

window.onload = function main(){
    initView();

    setTimeout(() => {
        initData();

        onDraw();
    }, 3000)
    
    
}
// 入口文件

require.context('../style', true, /\.(css)$/i);
require.context('./assets', true, /\.(png|jpe?g|gif)$/i);

let config = require('./config/config');
let imgFactory = require('./factory/imgFactory');
let canvas = require('./canvas');

const ID = 'canvas';

let mBgImg, mLandImgList, mPipeDownImgList, mPipeUpImgList, mBirdImgList;

let mLandListLength, mPipeListLength, mBirdImgListLength;

let bgRandom, bridRandom;

function initData(){
    bgRandom = Math.floor(Math.random() * 2);
    bridRandom = Math.floor(Math.random() * 3);

    mLandListLength = 2;
    mLandImgList = new Array(mLandListLength);
    mPipeListLength = 3;
    mPipeDownImgList = new Array(mPipeListLength);
    mPipeUpImgList = new Array(mPipeListLength);

    mBirdImgListLength = 3;
    mBirdImgList = new Array(mBirdImgListLength);
}

function initView(){
    let arr = [];
    arr.push(imgFactory.create(config.getBgFilePath(bgRandom)));
    for(let i = 0, length = mLandListLength; i< length; i++){
        arr.push(imgFactory.create(config.getLandFilePath()));
    }
    let pipeFilePathArr = config.getPipeFilePathArr(bgRandom);
    for(let i = 0, length = mPipeListLength; i< length; i++){
        arr.push(imgFactory.create(pipeFilePathArr[0]));
        arr.push(imgFactory.create(pipeFilePathArr[1]));
    }
    let birdFilePathArr = config.getBirdFilePathArr(bridRandom);
    arr.push(imgFactory.create(birdFilePathArr[0]));
    arr.push(imgFactory.create(birdFilePathArr[1]));
    arr.push(imgFactory.create(birdFilePathArr[2]));

    Promise.all(arr).then((values) => {
        mBgImg = values[0];
        
        canvas.onInit(ID, mBgImg.getWidth(), mBgImg.getHeight());   

        for(let i = 0, length = mLandListLength; i< length; i++){
            let index = i + 1;
            let item = values[index];
            item.setX(i * item.getWidth());
            item.setY(mBgImg.getHeight() - item.getHeight());
            mLandImgList[i] = item;
        }

        for(let i = 0, length = mPipeListLength; i< length; i++){
            let index = mLandListLength + i + 1;
           

            let pipeImgIntervalHeight = 115;//这个可以改动
            let pipeMinHeight = 80;//这个可以改动
            let pipeMaxHeight = mBgImg.getHeight() - mLandImgList[0].getHeight() - pipeImgIntervalHeight - pipeMinHeight;

            let pipeDownImgItem = values[index];
            let pipeUpImgItem = values[index + 1];

            let x = Math.ceil(mBgImg.getWidth() + i * mBgImg.getWidth() / 2);
            let downY = Math.ceil(Math.random() * (pipeMaxHeight - pipeMinHeight) + pipeMinHeight) - pipeDownImgItem.getHeight();
            let upY = downY + pipeUpImgItem.getHeight() + pipeImgIntervalHeight;
            
            pipeDownImgItem.setX(x);
            pipeUpImgItem.setX(x);
            pipeDownImgItem.setY(downY);
            pipeUpImgItem.setY(upY);

            mPipeDownImgList[i] = pipeDownImgItem;
            mPipeUpImgList[i] = pipeUpImgItem;
        }

        for(let i = 0, length = mBirdImgListLength; i< length; i++){
            let index = mLandListLength + 2 * mPipeListLength + i + 1;
            let item = values[index];
            item.setX(40);
            item.setY(mBgImg.getHeight() / 2);
            mBirdImgList[i] = item;
        }
    }).catch((err) => {
        
    })
    
}


function onDraw(){

    mBgImg.onDraw(canvas.getCachemCanvasContext());

    for(let i = 0, length = mLandListLength; i< length; i++){
        let item = mLandImgList[i];
        item.setX(item.getX() - 1);
        item.onDraw(canvas.getCachemCanvasContext());
    }

    for(let i = 0, length = mPipeListLength; i< length; i++){
        let pipeDownItem = mPipeDownImgList[i];
        let pipeUpItem = mPipeUpImgList[i];

        pipeDownItem.setX(pipeDownItem.getX() - 1);
        pipeUpItem.setX(pipeDownItem.getX() - 1);

        pipeDownItem.onDraw(canvas.getCachemCanvasContext());
        pipeUpItem.onDraw(canvas.getCachemCanvasContext());
    }


    canvas.onCopy();

    window.requestAnimationFrame(onDraw);
}

window.onload = function main(){
    initData();
    initView();

    setTimeout(() => {
        onDraw();
    }, 3000)
    
    
}
// 入口文件

require.context('../style', true, /\.(css)$/i);
require.context('./assets', true, /\.(png|jpe?g|gif)$/i);

let config = require('./config/config');
let imgFactory = require('./factory/imgFactory');
let canvas = require('./canvas');

const ID = 'canvas';
window.onload = function main(){
    let mBgImg, mLandImg, mPipeDownImg, mPipeUpImg;
    let bgRandom = Math.floor(Math.random() * 2);
    let bridRandom = Math.floor(Math.random() * 3);
    let arr = [];
    arr.push(imgFactory.create(config.getBgFilePath(bgRandom)));
    arr.push(imgFactory.create(config.getLandFilePath()));
    let pipeFilePathArr = config.getPipeFilePathArr(bgRandom);
    arr.push(imgFactory.create(pipeFilePathArr[0]));
    arr.push(imgFactory.create(pipeFilePathArr[1]));

    let birdFilePathArr = config.getBirdFilePathArr(bridRandom);
    arr.push(imgFactory.create(birdFilePathArr[0]));
    arr.push(imgFactory.create(birdFilePathArr[1]));
    arr.push(imgFactory.create(birdFilePathArr[2]));

    Promise.all(arr).then((values) => {
        mBgImg = values[0];
        canvas.onInit(ID, mBgImg.getWidth(), mBgImg.getHeight());   

        mLandImg = values[1];
        mLandImg.setY(mBgImg.getHeight() - mLandImg.getHeight());


        mPipeDownImg = values[2];
        mPipeUpImg = values[3];


        mBgImg.onDraw(canvas.getCachemCanvasContext());
        mLandImg.onDraw(canvas.getCachemCanvasContext());
        mPipeDownImg.onDraw(canvas.getCachemCanvasContext());
        mPipeUpImg.onDraw(canvas.getCachemCanvasContext());

        canvas.onCopy();
    })
    
    
}
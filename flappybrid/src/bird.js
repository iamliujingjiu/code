const BirdImg = require("./bean/BirdImg");

const birdFilePathList = [['./assets/bird0_0.png', './assets/bird0_1.png', './assets/bird0_2.png'], ['./assets/bird1_0.png', './assets/bird1_1.png', './assets/bird1_2.png'], ['./assets/bird2_0.png', './assets/bird2_1.png', './assets/bird2_2.png']];

let LENGTH = 3;
let mBirdList = [];

const random = Math.floor(Math.random() * 2);
let birdFilePathArr = birdFilePathList[random];
LENGTH = birdFilePathArr && birdFilePathArr.length;
mBirdList = new Array(LENGTH);

for(let index = 0; index < LENGTH;index++){
    let birdFilePath = birdFilePathArr[index];
    let bird = new BirdImg(birdFilePath);
    mBirdList[index] = bird;
}

function onInit(x, y){
    for(let index = 0; index < LENGTH;index++){
        let bird = mBirdList[index];
        bird.setX(x);
        bird.setY(y);
    }
}

function onMove(addY){
    for(let index = 0; index < LENGTH;index++){
        let bird = mBirdList[index];
        let y = bird.getY();
        bird.setY(y + addY);
    }
}

function onDraw(context, timer, angle){
    let index = Math.floor(timer % 9 / 3); 
    let bird = mBirdList[index];
    
    context ? context.drawImage(bird.getImg(angle), bird.getX(), bird.getY(), bird.getW(), bird.getH()) : '';
}

module.exports = {
    onInit : onInit,
    onMove : onMove,
    onDraw : onDraw
};